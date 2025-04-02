// Citation for the following code:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require('express');
const router = express.Router();
const {
    getProductsInvoices,
    createProduct,
    editInvoiceProduct,
    deleteInvoiceProduct
} = require('../controllers/invoicesProductsController');

router.get('/', getProductsInvoices);
router.post('/', createProduct);
router.put('/:invoicesProductsID', editInvoiceProduct);
router.delete('/:invoicesProductsID', deleteInvoiceProduct);

module.exports = router;