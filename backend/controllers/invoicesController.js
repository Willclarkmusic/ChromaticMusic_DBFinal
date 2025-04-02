// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const db = require('../database/config.js');
require('dotenv').config();

// Read
const getInvoices = async (req, res) => {
  try {
    const sql = `
    SELECT Invoices.*, Employees.name AS employee , Customers.name AS customer 
    FROM Invoices 
    LEFT JOIN Employees ON Invoices.employeeID = Employees.employeeID
    LEFT JOIN Customers ON Invoices.customerID = Customers.customerID;`

    const results = await db.pool.query(sql);
    res.json(results);
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Create 
const createInvoice = async (req, res) => {  
  const { date, invoiceAmount, employee, customer } = req.body;
  if (!date || !customer ) {
      return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const [employeeData] = await db.pool.query('SELECT employeeID FROM Employees WHERE name = ?;', employee);
    const employeeID = employeeData?.[0]?.employeeID || null;
    const [customerData] = await db.pool.query('SELECT customerID FROM Customers WHERE name = ?;', customer);
    const customerID = customerData[0].customerID;

    const sql = `INSERT INTO Invoices (date, invoiceAmount, employeeID, customerID ) VALUES (?,?,?,?);`;
    const values = [date, invoiceAmount, employeeID, customerID ];
    const [result] = await db.pool.query(sql, values);
    res.status(201).json({ message: 'invoice added successfully', invoiceID: result.insertId });

} catch (error) {
      console.error('Error inserting invoice:', error);
      res.status(500).json({ error: 'Database error' });
  }
};

// Update 
const editInvoice = async (req, res) => {
  const { invoiceID, } = req.params;
  const { date, invoiceAmount, employee, customer} = req.body;

  if (!date || !customer ) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [employeeData] = await db.pool.query('SELECT employeeID FROM Employees WHERE name = ?;', employee);
    const employeeID = employeeData?.[0]?.employeeID
    const [customerData] = await db.pool.query('SELECT customerID FROM Customers WHERE name = ?;', customer);
    const customerID = customerData[0].customerID 

    const sql = `UPDATE Invoices SET date = ?, invoiceAmount = ?, employeeID = ?, customerID = ? WHERE invoiceID = ?;`;
    const values = [date, invoiceAmount, employeeID, customerID, invoiceID];
    const [result] = await db.pool.query(sql, values);
    res.status(200).json({ message: 'Invoice updated successfully', invoiceID: result.insertId });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Database error' });
  }
};


// Delete 
const deleteInvoice = async (req, res) => {
  const { invoiceID } = req.params;
  
  try {
    const sql = 'DELETE FROM Invoices WHERE invoiceiD = ?;';
    const [result] = await db.pool.query(sql, invoiceID);
    res.status(204).json({ message: 'Invoice deleted successfully', invoiceID: result.insertId });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getInvoices,
  createInvoice,
  editInvoice,
  deleteInvoice
};