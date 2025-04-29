const path = require('path');

const showMain = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '/main.html'));
}

module.exports = { showMain };