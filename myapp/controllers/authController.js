const path = require('path');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const showRegister = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '/register.html'));
}

const showLogin = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '/login.html'));
}

const handleRegister = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요. '});
        }
    
        const existEmail = await User.findEmail(email);
        if(existEmail) {
            return res.status(400).json({ message: '아이디가 중복됩니다. '});
        }

        await User.insertUser({ email, password });
        return res.status(200).json({ redirectUrl: '/' });
    } catch(error) {
        return res.status(500).json({ message: '서버 오류 '});
    }
}

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요. '});
        }
    
        const user = await User.findUser(email);
        if(!user) {
            return res.status(400).json({ message: '존재하지않는 아이디입니다.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다. '});
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_TOKEN, 
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,       // JavaScript 접근 불가
            secure: true,         // HTTPS에서만 전송 (개발 환경에선 false 가능)
            sameSite: 'Strict',   // CSRF 방지
            maxAge: 1000 * 60 * 60 // 1시간
        });

        res.status(200).json({ redirectUrl: '/' });
    } catch(error) {
        return res.status(500).json({ message: '서버 오류' });
    }
}

const handleLogout = (req, res, next) => {
    res.clearCookie('token');
    return res.status(200).json({ redirectUrl: '/' });
}

module.exports = { showRegister, handleRegister, showLogin, handleLogin, handleLogout };