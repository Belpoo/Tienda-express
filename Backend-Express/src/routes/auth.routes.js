const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/auth.controller');

// POST /api/auth/register
router.post('/register', register);
// POST /api/auth/login
router.post('/login', login);
// GET /api/auth/users
router.get('/users', getUsers);

module.exports = router;
