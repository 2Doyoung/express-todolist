const express = require('express');
const { showRegister, handleRegister, showLogin, handleLogin } = require('../controllers/authController.js');

const router = express.Router();

router.get('/register', showRegister); 
router.post('/register', handleRegister);

router.get('/login', showLogin);
router.post('/login', handleLogin);

module.exports = router;