const express = require('express');
const { handleUserSignUp, handleUserLogin } = require('../controllers/user');

const router = express.Router();

router.post('/', handleUserSignUp);

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/login', (req, res) => {
    return res.render('login');
});

router.post('/login', handleUserLogin);

module.exports = router;