const bookService = require('../services/bookService');
const bookController = require('express').Router();

bookController.get('/catalog', async (req, res) => {
    const books = await bookService.getAll();
    console.log(books);
    res.render('catalog');
});

bookController.get('/create', (req, res) => {
    res.render('create');
});

bookController.post('/create', async (req, res) => {
    console.log(req.body);
    const book = await bookService.create(req.body);
    console.log(book);
    res.redirect('/book/catalog');
});

module.exports = bookController;
