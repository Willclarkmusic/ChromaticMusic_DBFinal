// Citation for the following code:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require('express');
const router = express.Router();

const {
    getInvoices,
    createInvoice,
    editInvoice,
    deleteInvoice
} = require('../controllers/invoicesController');

router.get('/', getInvoices);
router.post('/', createInvoice);
router.put('/:invoiceID', editInvoice);
router.delete('/:invoiceID', deleteInvoice);

module.exports = router;