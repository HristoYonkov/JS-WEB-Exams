const authController = require('express').Router();
const { register, login } = require('../services/userServise');
const { parseError } = require('../util/parser');

authController.get('/register', (req, res) => {
    // TODO: Replace with actual view by assignment!
    res.render('register', { title: 'Register Page' });
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required!')
        }
        if (req.body.password !== req.body.repass) {
            throw new Error('Passwords don\'t Match!')
        }
        const token = await register(req.body.username, req.body.password);

        // TODO: Check assignment to see if register create session?...
        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);

        // TODO: Add error display to actual template from assignment!...
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: req.body.username
            }
        })
    }
});

authController.get('/login', (req, res) => {
    res.render('login', {title: 'LoginP Page'});
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        
        res.cookie('token', token);
        res.redirect('/'); // TODO: replace by assignment!...
    } catch (error) {
        const errors = parseError(error);
        
        // TODO: Add error display to actual template from assignment!...
        res.render('login', {
            title: 'LoginP Page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController; 