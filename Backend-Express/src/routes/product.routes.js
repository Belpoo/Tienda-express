const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/product.controller');

router.get('/', getProducts);
router.post('/', protect, isAdmin, createProduct);

module.exports = router;
