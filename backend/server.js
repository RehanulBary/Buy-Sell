import express from "express";
import cors from "cors";
import mysql from "mysql2";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// MySQL connection (Railway)
const con = mysql.createConnection({
  host: process.env.DB_HOST, // mysql.railway.internal
  user: process.env.DB_USER, // root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

con.connect((err) => {
  if (err) console.log("❌ Error connecting database:", err);
  else console.log("✅ Database connected");
});

// --------------------
// Add product route (with FormData + image)
// --------------------
app.post("/enter_data", upload.single("productImage"), (req, res) => {
  const {
    productName,
    productPrice,
    productDescription,
    productCategory,
    productContact,
    productKey,
    location,
  } = req.body;

  // Ensure required fields exist
  if (
    !productName ||
    !productPrice ||
    !productDescription ||
    !productCategory ||
    !productContact ||
    !productKey ||
    !location
  ) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  // Convert price to number
  const priceNumber = parseFloat(productPrice);
  if (isNaN(priceNumber)) {
    return res
      .status(400)
      .json({ success: false, error: "Price must be a number" });
  }

  // Handle image path (if uploaded)
  let imagePath = null;
  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`;
  }

  const sql = `
    INSERT INTO forsale 
    (name, price, description, category, contact, product_key, location, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    productName,
    priceNumber,
    productDescription,
    productCategory,
    productContact,
    productKey,
    location,
    imagePath,
  ];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      return res
        .status(500)
        .json({ success: false, error: "Database insertion failed" });
    }

    console.log("✅ Product inserted:", result.insertId);
    res.json({
      success: true,
      message: "Product added successfully",
      productId: result.insertId,
      image: imagePath,
    });
  });
});

// --------------------
// Fetch product
// --------------------
app.get("/get_product", (req, res) => {
  const { id, key } = req.query;
  if (!id || !key)
    return res
      .status(400)
      .json({ success: false, error: "Product ID and Key required" });

  const sql = "SELECT * FROM forsale WHERE id = ?";
  con.query(sql, [id], (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: "Database error" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });

    const product = results[0];
    if (product.product_key !== key)
      return res
        .status(403)
        .json({ success: false, error: "Incorrect product key" });

    res.json({ success: true, product });
  });
});

// --------------------
// Remove product
// --------------------
app.delete("/remove_product", express.json(), (req, res) => {
  const { productId, productKey } = req.body;
  if (!productId || !productKey)
    return res
      .status(400)
      .json({ success: false, error: "Product ID and Product Key required" });

  const sql = "DELETE FROM forsale WHERE id = ? AND product_key = ?";
  con.query(sql, [productId, productKey], (err, result) => {
    if (err)
      return res.status(500).json({ success: false, error: "Database error" });
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, error: "Invalid Product ID or Key" });

    res.json({ success: true, message: "Product removed successfully" });
  });
});

// --------------------
// Search products
// --------------------
app.post("/search_products", express.json(), (req, res) => {
  const { search, location } = req.body;

  let sql = "SELECT * FROM forsale";
  const params = [];

  if (search && location) {
    sql +=
      " WHERE (name LIKE ? OR category LIKE ? OR description LIKE ?) AND location LIKE ?";
    const s = `%${search}%`;
    const l = `%${location}%`;
    params.push(s, s, s, l);
  } else if (search) {
    sql += " WHERE name LIKE ? OR category LIKE ? OR description LIKE ?";
    const s = `%${search}%`;
    params.push(s, s, s);
  } else if (location) {
    sql += " WHERE location LIKE ?";
    const l = `%${location}%`;
    params.push(l);
  }

  sql += " ORDER BY id DESC";

  con.query(sql, params, (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: "Database error" });
    res.json({ success: true, products: results });
  });
});

// --------------------
// Home: random 20 products
// --------------------
app.get("/", (req, res) => {
  const sql = "SELECT * FROM forsale ORDER BY RAND() LIMIT 20";
  con.query(sql, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, error: "Error fetching data" });
    res.json({ success: true, products: result });
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
