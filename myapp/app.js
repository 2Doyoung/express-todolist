const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();

const mainRoutes = require('./routes/mainRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const todoRoutes = require('./routes/todoRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 라우터
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

// 404 처리
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url}`);
    error.status = 404;
    next(error);
});

// 에러처리
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error');
});

app.listen(PORT, () => {
    console.log('서버 실행');
})


