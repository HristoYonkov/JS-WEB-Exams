const profileController = require('express').Router();

profileController.get('/', (req, res) => {
    res.render('profile');
})

module.exports = profileController;