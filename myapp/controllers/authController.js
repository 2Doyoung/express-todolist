const path = require('path');
const User = require('../models/userModel');

const showRegister = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '/register.html'));
}

const showLogin = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '/login.html'));
}

const handleRegister = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요. '});
    }
    
    const existEmail = await User.findEmail(email);
    if(existEmail) {
        return res.status(400).json({ message: '아이디가 중복됩니다. '});
    }

    try {
        await User.insertUser({ email, password });
        return res.status(200).json({ redirectUrl: '/' });
    } catch(error) {
        return res.status(500).json({ message: '서버 오류 '});
    }
}

const handleLogin = async (req, res, next) => {
    const { email, password } = req.body;
}

module.exports = { showRegister, handleRegister, showLogin, handleLogin };