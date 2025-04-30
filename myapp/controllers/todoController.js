const Todo = require('../models/todoModel');

const addTodo = async (req, res, next) => {
    try {
        const { todoItem } = req.body;
        const userId = req.user.id

        await Todo.insertTodo(todoItem, userId);        
    } catch(error) {
        return res.status(500).json({ message: '서버 오류 '});
    }
}

const todoList = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const todos = await Todo.getTodoList(userId);
        res.status(200).json({ todos });
    } catch(error) {
        return res.status(500).json({ message: '서버 오류 '});
    }
}

module.exports = { addTodo, todoList };