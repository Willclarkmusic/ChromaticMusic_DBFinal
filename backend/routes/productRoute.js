// Citation for the following code:
// Date: 2/24/2025
// Adapted from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require('express');
const router = express.Router();

const {
    getProducts,
    createProduct,
    editProduct,
    deleteProduct,
    getProductNames,
    getProductPrices
} = require('../controllers/productsController');

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:productID', editProduct);
router.delete('/:productID', deleteProduct);
router.get('/names', getProductNames);
router.get('/prices', getProductPrices);

module.exports = router;