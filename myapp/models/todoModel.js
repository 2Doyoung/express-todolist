const pool = require('../config/database.js');

const insertTodo = async (todoItem, userId) => {
    const query = 'INSERT INTO todo (user_id, todo_item) VALUES (?, ?)';
    await pool.execute(query, [userId, todoItem]);
}

const getTodoList = async (userId) => {
    const query = 'SELECT todo_item FROM todo WHERE user_id = ?';
    const [rows] = await pool.execute(query, [userId]);
    return rows;
}

module.exports = { insertTodo, getTodoList };