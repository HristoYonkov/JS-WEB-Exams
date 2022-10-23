function hasUser(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

function isGuest(req, res, next) {
    if (req.user) {
        res.redirect('/'); // TODO: Check assignment for correct redirect!...
    } else {
        next();
    }
}

module.exports = {
    hasUser,
    isGuest
};