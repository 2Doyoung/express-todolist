const pool = require('../config/database.js');

const insertTodo = async (todoItem, userId) => {
    const query = 'INSERT INTO todo (user_id, todo_item) VALUES (?, ?)';
    await pool.execute(query, [userId, todoItem]);
}

module.exports = { insertTodo };