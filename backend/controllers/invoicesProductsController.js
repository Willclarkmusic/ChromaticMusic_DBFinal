// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const db = require('../database/config.js');
require('dotenv').config();

// Read
const getProductsInvoices = async (req, res) => {
    try {
      const sql = `
      SELECT InvoicesProducts.*, Products.name AS productName , Products.cost AS productPrice 
      FROM InvoicesProducts 
      INNER JOIN Products ON InvoicesProducts.productID = Products.productID;`
  
      const results = await db.pool.query(sql);
      res.json(results);
    } catch (error) {
      console.error('Database operation failed:', error);
      res.status(500).json({ error: 'Database error' });
    }
  };
  
  // Create 
  const createProduct = async (req, res) => {  
    const { invoiceID, productName, orderQty, subTotal } = req.body;
    if (!invoiceID || !productName || !orderQty || !subTotal) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const [productData] = await db.pool.query('SELECT productID FROM Products WHERE name = ?;', productName);
      const productID = productData[0].productID;
  
      const sql = `INSERT INTO InvoicesProducts (invoiceID, productID, orderQty, subTotal ) VALUES (?,?,?,?);`;
      const values = [invoiceID, productID, orderQty, subTotal];
      const [result] = await db.pool.query(sql, values);
      res.status(201).json({ message: 'invoice products added successfully', invoicesProductsID: result.insertId });
  
  } catch (error) {
        console.error('Error inserting invoice:', error);
        res.status(500).json({ error: 'Database error' });
    }
  };
  
  // Update 
  const editInvoiceProduct = async (req, res) => {
    const { invoicesProductsID, } = req.params;
    const { invoiceID, productName, orderQty, subTotal } = req.body;
    if (!invoiceID || !productName || !orderQty || !subTotal) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const [productData] = await db.pool.query('SELECT productID FROM Products WHERE name = ?;', productName);
      const productID = productData[0].productID;
  
      const sql = `UPDATE InvoicesProducts SET invoiceID = ?, productID = ?, orderQty = ?, subTotal = ? WHERE invoicesProductsID = ?;`;
      const values = [invoiceID, productID, orderQty, subTotal, invoicesProductsID];
      const [result] = await db.pool.query(sql, values);
      res.status(200).json({ message: 'Invoice products updated successfully', invoicesProductsID: result.insertId });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Database error' });
    }
  };
  
  // Delete 
  const deleteInvoiceProduct = async (req, res) => {
    const { invoicesProductsID } = req.params;
    
    try {
      const sql = 'DELETE FROM InvoicesProducts WHERE invoicesProductsID = ?;';
      const [result] = await db.pool.query(sql, invoicesProductsID);
      res.status(204).json({ message: 'Invoice product deleted successfully', invoicesProductsID: result.insertId });
    } catch (error) {
      console.error('Error deleting invoice product:', error);
      res.status(500).json({ error: 'Database error' });
    }
  };

module.exports = {
    getProductsInvoices,
    createProduct,
    editInvoiceProduct,
    deleteInvoiceProduct
};