// Citation for the following code:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require('express');
const router = express.Router();
const {
    getCustomers,
    createCustomer,
    editCustomer,
    deleteCustomer,
    getCustomerNames
} = require('../controllers/customersController');

router.get('/', getCustomers);
router.post('/', createCustomer);
router.put('/:customerID', editCustomer);
router.delete('/:customerID', deleteCustomer);
router.get('/names', getCustomerNames);

module.exports = router;