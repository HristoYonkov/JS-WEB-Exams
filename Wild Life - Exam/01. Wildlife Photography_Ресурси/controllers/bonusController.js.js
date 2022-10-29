const bonusController = require('express').Router();
const { hasUser } = require('../middlewares/guard');
const ModelService = require('../services/ModelService');


bonusController.get('/search', hasUser(), async (req, res) => {
    const models = await ModelService.getAll().lean();
    res.render('search', { models });
});

bonusController.post('/search', hasUser(), async (req, res) => {
    const models = await ModelService.getBySearch(req.body.modelName, req.body.payMethod);
    // if (req.body.modelName === '') {
    //     res.redirect('/bonus/search');
    // }
    res.render('search', { models });
});

bonusController.get('/profile', async (req, res) => {
    res.render('profile', { books, email: req.user.email });
});





module.exports = bonusController;