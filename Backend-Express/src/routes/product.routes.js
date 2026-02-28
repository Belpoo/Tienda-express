const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, isAdmin, createProduct);
router.put('/update/:id', protect, isAdmin, updateProduct);
router.delete('/delete/:id', protect, isAdmin, deleteProduct);

module.exports = router;
