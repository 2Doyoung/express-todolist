const express = require('express');
const { showMain } = require('../controllers/mainController');

const router = express.Router();

router.get('/', showMain);

module.exports = router;