// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const db = require('../database/config.js');
require('dotenv').config();

// Create
const createEmployee = async (req, res) => {
  const { name, email, payRate, totalSales, bonusTotal, bonusPercent, department} = req.body;

  if (!name || !email || !payRate || !totalSales || !bonusTotal || !bonusPercent ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [departmentData] = await db.pool.query('SELECT deptID FROM Departments WHERE name = ?;', department);
    const deptID = departmentData?.[0]?.deptID || null;
    const sql = `INSERT INTO Employees (name, email, payRate, totalSales, bonusTotal, bonusPercent, deptID) VALUES (?,?,?,?,?,?,?);`;
    const values = [name, email, payRate, totalSales, bonusTotal, bonusPercent, deptID];
    const [result] = await db.pool.query(sql, values);
    res.status(201).json({ message: 'Employee added successfully', employeeID: result.insertId });
  } catch (error) {
    console.error('Error inserting employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Read
const getEmployees = async (req, res) => {
  try {
    const sql = 
    `
      SELECT Employees.*, Departments.name AS department
      FROM Employees
      LEFT JOIN Departments ON Employees.deptID = Departments.deptID;    
    `
    const results = await db.pool.query(sql);
    res.json(results);
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Update
const editEmployee = async (req, res) => {
  const { employeeID } = req.params;
  const { name, email, payRate, totalSales, bonusTotal, bonusPercent, department } = req.body;

  if (!name || !email || !payRate || !totalSales || !bonusTotal || !bonusPercent ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [departmentData] = await db.pool.query('SELECT deptID FROM Departments WHERE name = ?;', department);
    const deptID = departmentData?.[0]?.deptID || null;
    const sql = `UPDATE Employees SET name = ?, email = ?, payRate = ?, totalSales = ?, bonusTotal = ?, bonusPercent = ?, deptID = ? WHERE employeeID = ?;`;
    const values = [name, email, payRate, totalSales, bonusTotal, bonusPercent, deptID, employeeID];
    const [result] = await db.pool.query(sql, values);
    res.status(200).json({ message: 'Employee updated successfully', employeeID: result.insertId });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Delete
const deleteEmployee = async (req, res) => {
  const { employeeID } = req.params;

  try {
    const sql = 'DELETE FROM Employees WHERE employeeID = ?;';
    const [result] = await db.pool.query(sql, employeeID);
    res.status(204).json({ message: 'Employee deleted successfully', employeeID: result.insertId });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Read Employee Names
const getEmployeeNames = async (req, res) => {
  try {
    const results = await db.pool.query('SELECT name FROM Employees;');
    res.json(results);
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  editEmployee,
  deleteEmployee,
  getEmployeeNames
};