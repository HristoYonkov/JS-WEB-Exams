const homeController = require('express').Router();
const ModelService = require('../services/ModelService');

// TODO: Replace with real controller by assignment

homeController.get('/', async (req, res) => {
    const blocks = await ModelService.getAll().lean();
    const lastThree = blocks.slice(-3);
    console.log(lastThree);
    res.render('home', { lastThree });
});

module.exports = homeController;