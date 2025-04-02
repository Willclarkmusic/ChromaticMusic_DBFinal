// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const db = require('../database/config.js');
require('dotenv').config();

// Read
const getCustomers = async (req, res) => {
  try {
    const results = await db.pool.query('SELECT * FROM Customers;');
    res.json(results);
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Create
const createCustomer = async (req, res) => {
  const { name, email, phone, address, postalCode, marketingOptIn } = req.body;

  // Validation
  if ( !name || !email || !address || !postalCode) {
        return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const sql = `INSERT INTO Customers (name, email, phone, address, postalCode, marketingOptIn) VALUES (?,?,?,?,?,?);`;
    const values = [name, email, phone, address, postalCode, marketingOptIn ? 1 : 0];
    const [result] = await db.pool.query(sql, values);
    res.status(201).json({ message: 'Customer created successfully', customerID: result.insertId });

  } catch (error) {
    console.error('Error creating customer', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Edit
const editCustomer = async (req, res) => {
  const { customerID } = req.params;
  const { name, email, phone, address, postalCode, marketingOptIn } = req.body;

  if (!customerID || !name || !email || !address || !postalCode) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const sql = `UPDATE Customers SET name = ?, email = ?, phone = ?, address = ?, postalCode = ?, marketingOptIn = ? WHERE customerID = ?;`;
    const values = [name, email, phone, address, postalCode, marketingOptIn ? 1 : 0, customerID];
    const [result] = await db.pool.query(sql, values);
    res.status(200).json({ message: 'Customer updated successfully', customerID: result.insertId });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Delete
const deleteCustomer = async (req, res) => {
  const { customerID } = req.params;

  try {
    const sql = 'DELETE FROM Customers WHERE customerID = ?;';
    const [result] = await db.pool.query(sql, customerID);
    res.status(204).json({ message: 'Customer deleted successfully', customerID: result.insertId });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Read Customer Names
const getCustomerNames = async (req, res) => {
  try {
    const results = await db.pool.query('SELECT name FROM Customers;');
    res.json(results);
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
    getCustomers,
    createCustomer,
    editCustomer,
    deleteCustomer,
    getCustomerNames
}