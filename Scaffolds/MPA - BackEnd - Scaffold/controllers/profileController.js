const bookService = require('../services/bookService');

const profileController = require('express').Router();

profileController.get('/', async (req, res) => {
    const books = await bookService.findConnection(req.user._id).lean();
    console.log(books);
    res.render('profile', { books, email: req.user.email });
});




module.exports = profileController;