const pool = require('../config/database.js');
const bcrypt = require('bcrypt');

// 회원가입
const insertUser = async (user) => {
    const { email, password } = user;

    const hashedPassword = await bcrypt.hash(password, 12);

    const query = 'INSERT INTO user (email, password) VALUES (?, ?)';
    await pool.execute(query, [email, hashedPassword]);
}

// 중복 체크
const findEmail = async (email) => {
    const query = 'SELECT id FROM user WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
}

// 유저 로그인 아이디, 비밀번호
const findUser = async (email) => {
    const query = 'SELECT id, email, password FROM user WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
}

module.exports = { insertUser, findEmail, findUser };