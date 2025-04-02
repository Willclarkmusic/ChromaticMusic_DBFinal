// Citation for the following code:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require('express');
const router = express.Router();

const {
    getEmployees,
    createEmployee,
    editEmployee,
    deleteEmployee,
    getEmployeeNames
} = require('../controllers/employeesController');

router.get('/', getEmployees);
router.post('/', createEmployee);
router.put('/:employeeID', editEmployee);
router.delete('/:employeeID', deleteEmployee);
router.get('/names', getEmployeeNames);

module.exports = router;