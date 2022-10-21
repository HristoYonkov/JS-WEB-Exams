const homeController = require('express').Router();

// TODO: Replace with real controller by assignment

homeController.get('/', (req, res) => {
    res.render('home', {title: 'Home Page!'})
});

module.exports = homeController;