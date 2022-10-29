// TODO: Take model according to the assignment!
const Model = require('../models/Model');

function getAll() {
    return  Model.find();
}

function findConnection(userId) {
    return  Model.find({wishingList: userId});
}

function getOne(id) {
    return Model.findById(id);
}

async function create(model, userId) {
    
    return await Model.create({
        name: model.name,
        image: model.image,
        price: model.price,
        description: model.description,
        payMethod: model.payMethod,
        buyers: model.buyers,
        owner: userId
    });
}

async function edit(id, book) {
    const editted = await Model.findById(id)
    editted.title = book.title
    editted.author = book.author
    editted.genre = book.genre
    editted.stars = book.stars
    editted.image = book.image
    editted.review = book.review
    await editted.save();
}

async function deleteById(id) {
    return await Model.findByIdAndDelete(id);
}

async function wish(id, userId) {
    return await Model.findByIdAndUpdate(id,{wishingList: userId});
}


module.exports = {
    getAll,
    create,
    getOne,
    edit,
    deleteById,
    wish,
    findConnection
}