-- Create database
CREATE DATABASE IF NOT EXISTS SALESDATA;

-- Use the database
USE SALESDATA;

-- Create table
CREATE TABLE IF NOT EXISTS forsale (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    description VARCHAR(1000),
    category VARCHAR(250),
    contact VARCHAR(20),
    image VARCHAR(250),
    product_key VARCHAR(100) NOT NULL  
);


SELECT * FROM forsale;
