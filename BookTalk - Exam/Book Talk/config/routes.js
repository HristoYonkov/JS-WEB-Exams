const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/book', bookController);
    app.use('/profile', profileController);
}