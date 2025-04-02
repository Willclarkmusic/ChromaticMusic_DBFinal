// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const db = require('../database/config.js');
require('dotenv').config();

// Read
const getProducts = async (req, res) => {
    try {
        const sql = `
    SELECT Products.*, Products.name as department, Departments.name AS department 
    FROM Products 
    LEFT JOIN Departments ON Products.deptID = Departments.deptID;`

        const results = await db.pool.query(sql);
        res.json(results);
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).send('Server error');
    }
};

// Create
const createProduct = async (req, res) => {
    const { name, cost, stockQnty, manufacturer, department } = req.body;
    if (!name || !cost || !stockQnty || !manufacturer ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const [departmentData] = await db.pool.query('SELECT deptID FROM Departments WHERE name = ?;', department);
        const deptID = departmentData?.[0]?.deptID || null;
        const sql = `INSERT INTO Products (name, cost, stockQnty, manufacturer, deptID) VALUES (?,?,?,?,?);`;
        const values = [name, cost, stockQnty, manufacturer, deptID];
        console.log(values)
        const [result] = await db.pool.query(sql, values);

        res.status(201).json({ message: 'Product added successfully', productID: result.insertId });
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Update
const editProduct = async (req, res) => {
    const { productID, } = req.params;
    const { name, cost, stockQnty, manufacturer, department } = req.body;

    if (!name || !cost || !stockQnty || !manufacturer ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [departmentData] = await db.pool.query('SELECT deptID FROM Departments WHERE name = ?;', department);
        const deptID = departmentData?.[0]?.deptID || null;
        const sql = `UPDATE Products SET name = ?, cost = ?, stockQnty = ?, manufacturer = ?, deptID = ? WHERE productID = ?;`;
        const values = [name, cost, stockQnty, manufacturer, deptID, productID];
        const [result] = await db.pool.query(sql, values);
        res.status(200).json({ message: 'Product updated successfully', productID: result.insertId });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


// Delete
const deleteProduct = async (req, res) => {
    const { productID } = req.params;
    try {
        const sql = 'DELETE FROM Products WHERE productID = ?;';
        const [result] = await db.pool.query(sql, productID);
        res.status(204).json({ message: 'Product deleted successfully', productID: result.insertId });
    } catch (error) {
        console.error('Error deleting product1');
        res.status(500).json({ error: 'Database error' });
    }
};

// Read Product Names
const getProductNames = async (req, res) => {
    try {
        const results = await db.pool.query('SELECT name FROM Products;');
        res.json(results);
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).send('Server error');
    }
};

// Read Product Prices
const getProductPrices = async (req, res) => {
    try {
        const results = await db.pool.query('SELECT cost FROM Products;');
        res.json(results);
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getProducts,
    createProduct,
    editProduct,
    deleteProduct,
    getProductNames,
    getProductPrices
}