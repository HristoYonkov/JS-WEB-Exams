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
        if (Object.values(req.body).some(x => !x)) {
            throw new Error('All fields are required!')
        }
        const book = await bookService.create(req.body, req.user._id);
        
        res.redirect('/book/catalog');
        
    } catch (error) {
        const errors = parseError(error);
        console.log(req.body);
        // TODO: Add error display to actual template from assignment!...
        res.render('create', {
            title: 'Register Page',
            errors,
            body: req.body
        });
    }
});

bookController.get('/details/:id', async (req, res) => {
    const book = await bookService.getOne(req.params.id).lean();

    book.isOwner = false;
    book.isWished = false;
    
    if(req.user && book.owner == req.user._id) {
        book.isOwner = true;
    } else if (req.user && book.wishingList.map(b => b.toString()).includes(req.user._id.toString())) {
        book.isWished = true;
    }
    
    res.render('details', {book, user: req.user});
});

bookController.get('/edit/:id', async (req, res) => {
    const book = await bookService.getOne(req.params.id).lean();
    if (book.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    
    res.render('edit', {book});
});

bookController.post('/edit/:id', async (req, res) => {
    const book = await bookService.getOne(req.params.id).lean();
    if (book.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    
    try {
        if (Object.values(req.body).some(x => !x)) {
            throw new Error('All fields are required!')
        }
        
        const editted = await bookService.edit(req.params.id, req.body);
        res.redirect(`/book/details/${req.params.id}`);
        
    } catch (error) {
        res.render('edit', {
            book: req.body,
            errors: parseError(error),
        });
    }
});

bookController.get('/delete/:id', async (req, res) => {
    try {
        await bookService.deleteById(req.params.id);
        res.redirect('/book/catalog')

    } catch (error) {
        res.redirect(`/book/details/${req.params.id}`, {book, errors: parseError(error)});
    }
});

bookController.get('/wish/:id', async (req, res) => {
    const book = await bookService.wish(req.params.id, req.user._id);
    res.redirect(`/book/details/${req.params.id}`);
});


module.exports = bookController;
