const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(200).json({ isLoggedIn: false });    

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        res.status(200).json({ isLoggedIn: true, user: decoded });
    } catch(error) {
        res.status(200).json({ isLoggedIn: false });
    }
}

module.exports = authJWT;