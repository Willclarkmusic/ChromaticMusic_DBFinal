// Citation for the following code:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require('express');
const router = express.Router();

const {
    getDepartments,
    createDepartment,
    editDepartment,
    deleteDepartment,
    getDepartmentNames
} = require('../controllers/departmentsController');

router.get('/', getDepartments);
router.post('/', createDepartment);
router.put('/:deptID', editDepartment);
router.delete('/:deptID', deleteDepartment);
router.get('/names', getDepartmentNames);

module.exports = router;