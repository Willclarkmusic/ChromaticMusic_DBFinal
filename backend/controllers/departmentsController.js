// Citation for the following module:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const db = require('../database/config.js');
require('dotenv').config();

// Read
const getDepartments = async (req, res) => {
    try {
        const results = await db.pool.query('SELECT * FROM Departments;');
        res.json(results);
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Create
const createDepartment = async (req, res) => {
    const { name, phoneExt, yearToDateSales } = req.body;

    if (!name || !phoneExt ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const sql = `INSERT INTO Departments (name, phoneExt, yearToDateSales ) VALUES (?,?,?);`;
        const values = [name, phoneExt, yearToDateSales];
        const [result] = await db.pool.query(sql, values);

        res.status(201).json({ message: 'Department added successfully', deptID: result.insertId });
    } catch (error) {
        console.error('Error inserting department:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Edit
const editDepartment = async (req, res) => {
    const { deptID } = req.params;
    const { name, phoneExt, yearToDateSales } = req.body;

    if (!name || !phoneExt ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const sql = `UPDATE Departments SET name = ?, phoneExt = ?, yearToDateSales = ? WHERE deptID = ?;`;
        const values = [name, phoneExt, yearToDateSales, deptID];
        const [result] = await db.pool.query(sql, values);
        res.status(200).json({ message: 'Department updated successfully', deptID: result.insertId });
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete
const deleteDepartment = async (req, res) => {
    const { deptID } = req.params;
    try {
        const sql = 'DELETE FROM Departments WHERE deptID = ?;';
        const [result] = await db.pool.query(sql, deptID);
        res.status(204).json({ message: 'Department deleted successfully', deptID: result.insertId });
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({ error: 'Database error' });
    }
}

// Read Department Names
const getDepartmentNames = async (req, res) => {
    try {
        const results = await db.pool.query('SELECT name FROM Departments;');
        res.json(results);
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {
    getDepartments,
    createDepartment,
    editDepartment,
    deleteDepartment,
    getDepartmentNames
};