const ModelController = require('express').Router();
const { hasUser, isGuest } = require('../middlewares/guard');
const ModelService = require('../services/ModelService');
const userService = require('../services/userServise');
const { parseError } = require('../util/parser');


ModelController.get('/catalog', async (req, res) => {
    const models = await ModelService.getAll().lean();
    res.render('catalog', { models });
});

ModelController.get('/create', hasUser(), (req, res) => {
    res.render('create');
});

ModelController.post('/create', hasUser(), async (req, res) => {

    try {
        if (Object.values(req.body).some(x => !x)) {
            throw new Error('All fields are required!')
        }
        const model = await ModelService.create(req.body, req.user._id);

        res.redirect('/model/catalog');

    } catch (error) {
        const errors = parseError(error);
        // TODO: Add error display to actual template from assignment!...
        res.render('create', {
            errors,
            body: req.body
        });
    }
});

ModelController.get('/details/:id', async (req, res) => {
    const model = await ModelService.getOne(req.params.id).lean();
    const author = await userService.getAuthor(req.user._id).lean();
    const authorName = `${author.firstname} ${author.lastname}`;
    //const votedPeople = await ModelService.getByPosts(req.params.id);
    
    model.isAuthor = false;
    model.isVoted = false;

    if (req.user && model.author.toString() == req.user._id) {
        model.isAuthor = true;

    } else if (req.user && model.votes && model.votes.map(b => b.toString()).includes(req.user._id.toString())) {
        model.isVoted = true;
    }

    res.render('details', { model, user: req.user, authorName });
});

ModelController.get('/edit/:id', hasUser(), async (req, res) => {
    const model = await ModelService.getOne(req.params.id).lean();
    if (model.author != req.user._id) {
        return res.redirect('/auth/login');
    }

    res.render('edit', { model });
});

ModelController.post('/edit/:id', hasUser(), async (req, res) => {
    const model = await ModelService.getOne(req.params.id).lean();
    if (model.author != req.user._id) {
        return res.redirect('/auth/login');
    }

    try {
        if (Object.values(req.body).some(x => !x)) {
            throw new Error('All fields are required!')
        }

        const editted = await ModelService.edit(req.params.id, req.body);
        res.redirect(`/model/details/${req.params.id}`);

    } catch (error) {
        res.render('edit', {
            model: req.body,
            errors: parseError(error),
        });
    }
});

ModelController.get('/delete/:id', hasUser(), async (req, res) => {
    let model = await ModelService.getOne(req.params.id);
    if (model.author != req.user._id) {
        return res.redirect('/auth/login');
    }
    ModelService.deleteById(req.params.id)
    res.redirect('/model/catalog');
});

ModelController.get('/posts', hasUser(), async (req, res) => {
    const models = await ModelService.findConnection(req.user._id);
    console.log(models);
    res.render(`my-posts`);
});

ModelController.get('/voteUp/:id', hasUser(), async (req, res) => {
    const model = await ModelService.voteUp(req.params.id, req.user._id);
    res.redirect(`/model/details/${req.params.id}`);
});
ModelController.get('/voteDown/:id', hasUser(), async (req, res) => {
    const model = await ModelService.voteDown(req.params.id, req.user._id);
    res.redirect(`/model/details/${req.params.id}`);
});




module.exports = ModelController;