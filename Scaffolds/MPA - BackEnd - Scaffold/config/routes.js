const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const ModelController = require("../controllers/ModelController");
const profileController = require("../controllers/profileController");
const { hasUser } = require("../middlewares/guard");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/model', ModelController);
    app.use('/profile', profileController);
    app.get('*', (req, res) => {
        res.render('404');
    })
}