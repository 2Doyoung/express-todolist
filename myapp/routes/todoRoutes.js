const express = require('express');
const { addTodo } = require('../controllers/todoController.js');
const { authJWT } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/add', authJWT, addTodo);

module.exports = router;