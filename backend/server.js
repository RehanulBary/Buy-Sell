import express from "express";
import cors from "cors";
import mysql from "mysql2";
import multer from "multer";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$$596552",
  database: "SALESDATA"
});

con.connect((err) => {
  if (err) console.log("Error connecting database:", err);
  else console.log("Database connected");
});

// Add product
app.post("/enter_data", upload.single("productImage"), (req, res) => {
  const { productName, productPrice, productDescription, productCategory, productContact, productKey, location } = req.body;
  const imgUrl = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO forsale (name, price, description, category, contact, image, product_key, location)
    VALUES (?,?,?,?,?,?,?,?)
  `;
  const values = [productName, productPrice, productDescription, productCategory, productContact, imgUrl, productKey, location];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error inserting data:", err);
      return res.status(500).json({ success: false, error: "Database insertion failed" });
    }
    res.json({ success: true, message: "Product added successfully", productId: result.insertId });
  });
});

// Fetch product safely
app.get("/get_product", (req, res) => {
  const { id, key } = req.query;
  if (!id) return res.json({ success: false, error: "No product ID provided" });
  if (!key) return res.json({ success: false, error: "No product key provided" });

  const sql = "SELECT * FROM forsale WHERE id = ?";
  con.query(sql, [id], (err, results) => {
    if (err) return res.json({ success: false, error: "Database error" });
    if (results.length === 0) return res.json({ success: false, error: "Product not found" });

    const product = results[0];
    if (product.product_key !== key) {
      return res.json({ success: false, error: "Incorrect product key" });
    }

    res.json({ success: true, product }); // product now includes location
  });
});

// Remove product safely
app.delete("/remove_product", (req, res) => {
  const { productId, productKey } = req.body;
  if (!productId || !productKey) {
    return res.status(400).json({ success: false, error: "Product ID and Product Key required" });
  }

  const sql = "DELETE FROM forsale WHERE id = ? AND product_key = ?";
  con.query(sql, [productId, productKey], (err, result) => {
    if (err) {
      console.log("Error deleting product:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.json({ success: false, error: "Invalid Product ID or Key" });
    }

    res.json({ success: true, message: "Product removed successfully" });
  });
});

// Search products
app.post("/search_products", (req, res) => {
  const { search, location } = req.body;

  let sql = "SELECT * FROM forsale";
  let params = [];

  if (search && search.trim() !== "" && location && location.trim() !== "") {
    sql += " WHERE (name LIKE ? OR category LIKE ? OR description LIKE ?) AND location LIKE ?";
    const searchTerm = `%${search}%`;
    const locationTerm = `%${location}%`;
    params = [searchTerm, searchTerm, searchTerm, locationTerm];
  } else if (search && search.trim() !== "") {
    sql += " WHERE name LIKE ? OR category LIKE ? OR description LIKE ?";
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm, searchTerm];
  } else if (location && location.trim() !== "") {
    sql += " WHERE location LIKE ?";
    const locationTerm = `%${location}%`;
    params = [locationTerm];
  }

  sql += " ORDER BY id DESC";

  con.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: "Database error" });
    res.json({ success: true, products: results });
  });
});

// Home: random 20 products
app.get("/", (req, res) => {
  const sql = "SELECT * FROM forsale ORDER BY RAND() LIMIT 20";
  con.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, error: "Error fetching data" });
    res.send(result);
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
