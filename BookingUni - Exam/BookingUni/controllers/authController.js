const { register } = require('../services/userServise');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    // TODO: Replace with actual view by assignment!
    res.render('register', { title: 'Register Page' });
});

authController.post('/register', async (req, res) => {
    console.log(req.body);
    const token = await register(req.body.username, req.body.password);
    res.cookie('token', token);

    res.redirect('/auth/register');
});


module.exports = authController; 