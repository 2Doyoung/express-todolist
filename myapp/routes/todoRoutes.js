const express = require('express');
const { addTodo, todoList } = require('../controllers/todoController.js');
const { authJWT } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/add', authJWT, addTodo);
router.get('/list', authJWT, todoList);

module.exports = router;