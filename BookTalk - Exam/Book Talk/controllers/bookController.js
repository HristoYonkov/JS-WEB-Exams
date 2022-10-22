const bookService = require('../services/bookService');
const { parseError } = require('../util/parser');
const bookController = require('express').Router();

bookController.get('/catalog', async (req, res) => {
    const books = await bookService.getAll().lean();
    res.render('catalog', {books});
});

bookController.get('/create', (req, res) => {
    res.render('create');
});

bookController.post('/create', async (req, res) => {
    
    try {
        const book = await bookService.create(req.body, req.user._id);
        
        res.redirect('/book/catalog');
        
    } catch (error) {
        const errors = parseError(error);
        // TODO: Add error display to actual template from assignment!...
        res.render('create', {
            title: 'Register Page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

bookController.get('/details/:id', async (req, res) => {
    const user = req.user;
    const book = await bookService.getOne(req.params.id).lean();
    res.render('details', {book, user});
})

module.exports = bookController;
