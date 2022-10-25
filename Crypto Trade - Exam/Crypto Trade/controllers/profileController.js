const profileController = require('express').Router();

profileController.get('/', async (req, res) => {
    res.render('profile', { books, email: req.user.email });
});




module.exports = profileController;