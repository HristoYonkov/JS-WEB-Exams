const ModelController = require('express').Router();
const ModelService = require('../services/ModelsService');
const { parseError } = require('../util/parser');


ModelController.get('/catalog', async (req, res) => {
    const models = await ModelService.getAll().lean();
    res.render('catalog', {models});
});

ModelController.get('/create', (req, res) => {
    res.render('create');
});

ModelController.post('/create', async (req, res) => {
    
    try {
        if (Object.values(req.body).some(x => !x)) {
            throw new Error('All fields are required!')
        }
        const model = await ModelService.create(req.body, req.user._id);
        
        res.redirect('/model/catalog');
        
    } catch (error) {
        console.log(req.body);
        const errors = parseError(error);
        // TODO: Add error display to actual template from assignment!...
        res.render('create', {
            errors,
            body: req.body
        });
    }
});

ModelController.get('/details/:id', async (req, res) => {
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

ModelController.get('/edit/:id', async (req, res) => {
    const book = await bookService.getOne(req.params.id).lean();
    if (book.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    
    res.render('edit', {book});
});

ModelController.post('/edit/:id', async (req, res) => {
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

ModelController.get('/delete/:id', async (req, res) => {
    try {
        await bookService.deleteById(req.params.id);
        res.redirect('/book/catalog')

    } catch (error) {
        res.redirect(`/book/details/${req.params.id}`, {book, errors: parseError(error)});
    }
});

ModelController.get('/wish/:id', async (req, res) => {
    const book = await bookService.wish(req.params.id, req.user._id);
    res.redirect(`/book/details/${req.params.id}`);
});




module.exports = ModelController;