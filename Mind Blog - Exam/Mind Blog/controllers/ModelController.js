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
    const author = await userService.getAuthor(model.owner.toString()).lean();
    const ownerName = `${author.email}`;
    //const votedPeople = await ModelService.getByPosts(req.params.id);
    model.isOwner = false;
    model.isFollowed = false;

    const follows = await ModelService.getByFollows(req.params.id).lean();
    let followers = [];
    for (let fol of follows.follows) {
        followers.push(fol.username)
    }

    followers = followers.join(', ')
    
    if (req.user && model.owner.toString() == req.user._id) {
        model.isOwner = true;

    } else if (req.user && model.follows && model.follows.map(b => b.toString()).includes(req.user._id.toString())) {
        model.isFollowed = true;
    }

    res.render('details', { model, user: req.user, ownerName, followers });
});

ModelController.get('/edit/:id', hasUser(), async (req, res) => {
    const model = await ModelService.getOne(req.params.id).lean();
    if (model.owner != req.user._id) {
        return res.redirect('/');
    }

    res.render('edit', { model });
});

ModelController.post('/edit/:id', hasUser(), async (req, res) => {
    const model = await ModelService.getOne(req.params.id).lean();
    if (model.owner != req.user._id) {
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
    if (model.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    ModelService.deleteById(req.params.id)
    res.redirect('/model/catalog');
});


ModelController.get('/follow/:id', hasUser(), async (req, res) => {
    const model = await ModelService.voteUp(req.params.id, req.user._id);
    res.redirect(`/model/details/${req.params.id}`);
});



module.exports = ModelController;