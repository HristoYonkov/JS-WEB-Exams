// TODO: Take model according to the assignment!
const Model = require('../models/Model');

function getAll() {
    return Model.find();
}

function getByFollows(modelId) {
    return Model.findById(modelId).populate('follows')
}
async function getCreated(userId) {
    return Model.find({ owner: userId }).lean()
}

async function getFollowed(userId) {
    return Model.find({ follows: userId }).lean()
}

function getOne(id) {
    return Model.findById(id);
}

async function findConnection(userId) {
    return await Model.find({ author: userId });
}

async function buy(id, userId) {
    return await Model.findByIdAndUpdate(id, { buyers: userId });
}

async function create(model, userId) {
    return await Model.create({
        title: model.title,
        image: model.image,
        content: model.content,
        category: model.category,
        owner: userId,
    });
}

async function edit(id, model) {
    const editted = await Model.findById(id)
    editted.title = model.title,
    editted.image = model.image,
    editted.content = model.content,
    editted.category = model.category,

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

async function voteUp(modelId, userId) {
    let changed = await Model.findById(modelId);
    changed.follows.push(userId);
    changed.save();
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
    voteUp,
    getByFollows,
    getCreated,
    getFollowed,
}