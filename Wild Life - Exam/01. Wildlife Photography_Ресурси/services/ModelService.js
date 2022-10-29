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
        name: model.name,
        image: model.image,
        price: model.price,
        description: model.description,
        payMethod: model.payMethod,
        buyers: model.buyers,
        owner: userId
    });
}

async function edit(id, model) {
    const editted = await Model.findById(id)
    editted.name = model.name,
    editted.image = model.image,
    editted.price = model.price,
    editted.description = model.description,
    editted.payMethod = model.payMethod,
    editted.buyers = model.buyers,
        
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
    getBySearch
}