const bonusController = require('express').Router();
const { hasUser } = require('../middlewares/guard');
const ModelService = require('../services/ModelService');
const userService = require('../services/userServise');

bonusController.get('/profile', async (req, res) => {
    const currentUser = await userService.getAuthor(req.user._id).lean();
    const created = await ModelService.getCreated(req.user._id);
    const followed = await ModelService.getFollowed(req.user._id);

    let createdLength = 0;
    let followedLength = 0;
    
    if(created.length > 0) {
        createdLength = created.length;
    }
    if(followed.length > 0 ) {
        followedLength = followed.length;
    }

    console.log(followed);
    //console.log(created);

    //console.log(currentUser);
    res.render('profile', { currentUser, created, followed, createdLength, followedLength });
});





module.exports = bonusController;