// TODO: Take model according to the assignment!
const Model = require('../models/Model');

function getAll() {
    return  Model.find();
}

function getOne(id) {
    return Model.findById(id);
}

function findConnection(userId) {
    return  Model.find({wishingList: userId});
}

async function buy(id, userId) {
    return await Model.findByIdAndUpdate(id,{buyers: userId});
}

async function create(model, userId) { 
    return await Model.create({
        title: model.title,
        description: model.description,
        category: model.category,
        image: model.image,
        price: model.price,
        bidder: model.bidder,
        author: userId
    });
}

async function edit(id, model) {
    const editted = await Model.findById(id);
    editted.title = model.title;
    editted.description = model.description;
    editted.category = model.category;
    editted.image = model.image;
    editted.price = model.price;
        
    await editted.save();
}

async function editPrice(price, id, userId) {
    const editted = await Model.findById(id)
    editted.price = price;
    editted.bidder = userId;
    await editted.save();
}

async function deleteById(id) {
    try {
        return await Model.findByIdAndDelete(id);
        
    } catch (error) {
        return error;
    }
}
// TODO: Check if 2 fields for search!
async function getBySearch(modelName, payMethod) {
    return await Model.find({ name: { $regex: modelName, $options: 'i' }, payMethod: { $regex: payMethod, $options: 'i' } }).lean(); 
}



module.exports = {
    getAll,
    create,
    getOne,
    edit,
    deleteById,
    findConnection,
    buy,
    getBySearch,
    editPrice,
}