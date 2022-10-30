const authController = require("../controllers/authController");
const bonusController = require("../controllers/bonusController.js");
const homeController = require("../controllers/homeController");
const ModelController = require("../controllers/ModelController");
const { hasUser } = require("../middlewares/guard");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/model', ModelController);
    app.use('/bonus', hasUser(), bonusController);
    app.get('*', (req, res) => {
        res.render('404');
    })
}