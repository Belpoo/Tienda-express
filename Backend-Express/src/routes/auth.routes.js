const express = require('express');
const router = express.Router();
const { register, login, logout, getUsers } = require('../controllers/auth.controller');

// POST /api/auth/register
router.post('/register', register);
// POST /api/auth/login
router.post('/login', login);
// POST /api/auth/logout
router.post('/logout', logout);
// GET /api/auth/users
router.get('/users', getUsers);
// POST /api/auth/logout
router.post('/logout', protect, logout);

module.exports = router;
