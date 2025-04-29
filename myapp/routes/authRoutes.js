const express = require('express');
const { showRegister, handleRegister } = require('../controllers/authController.js');

const router = express.Router();

router.get('/register', showRegister); 
router.post('/register', handleRegister);

module.exports = router;