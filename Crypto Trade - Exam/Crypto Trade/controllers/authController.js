const { register, login } = require('../services/userServise');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    // TODO: Replace with actual view by assignment!
    res.render('register');
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required!')
        }
        if (req.body.password !== req.body.repass) {
            throw new Error('Passwords or Email don\'t Match!')
        }
        if (req.body.password.length < 4) {
            throw new Error('Password must be atleast 4 characters long!');
        }
        const token = await register(req.body.username, req.body.email, req.body.password);
        
        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);
        // TODO: Add error display to actual template from assignment!...
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: req.body.username,
                email: req.body.email
            }
        });
    }
});

authController.get('/login', (req, res) => {
    // TODO: Replace with actual view by assignment!
    res.render('login');
});

authController.post('/login', async (req, res) => {
    // TODO: Replace with actual view by assignment!
    try {
        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email
            }
        });
    }
    
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController; 