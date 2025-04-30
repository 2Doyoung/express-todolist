const express = require('express');
const { showRegister, handleRegister, showLogin, handleLogin, handleLogout } = require('../controllers/authController.js');
const authJWT = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/loginCheck', authJWT);

router.get('/register', showRegister); 
router.post('/register', handleRegister);

router.get('/login', showLogin);
router.post('/login', handleLogin);

router.post('/logout', handleLogout);

module.exports = router;