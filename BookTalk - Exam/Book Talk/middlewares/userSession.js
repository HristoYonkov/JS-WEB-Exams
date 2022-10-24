const { verifyToken } = require("../services/userServise");


module.exports = () => (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        try {
            const userData = verifyToken(token);

            //set user to request
            req.user = userData;
            res.locals.username = userData.email;
        } catch (error) {
            res.clearCookie('token');
            res.redirect('/auth/login');

            //return is necessary because catch will take error end will contoniue
            return;
        }
    }

    next()
}