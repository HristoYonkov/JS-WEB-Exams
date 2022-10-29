const authController = require("../controllers/authController");
const bonusController = require("../controllers/bonusController.js");
const homeController = require("../controllers/homeController");
const ModelController = require("../controllers/ModelController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/model', ModelController);
    app.use('/bonus', bonusController);
    app.get('*', (req, res) => {
        res.render('404');
    })
}