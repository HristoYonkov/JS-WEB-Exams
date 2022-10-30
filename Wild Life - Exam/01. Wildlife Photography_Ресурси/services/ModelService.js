// TODO: Take model according to the assignment!
const Model = require('../models/Model');

function getAll() {
    return Model.find();
}

function getByPosts(modelId) {
    return Model.find({ votes })
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
        keyword: model.keyword,
        location: model.location,
        date: model.date,
        image: model.image,
        description: model.description,
        author: userId,
        votes: model.votes,
    });
}

async function edit(id, model) {
    const editted = await Model.findById(id)
    editted.title = model.title,
        editted.keyword = model.keyword,
        editted.location = model.location,
        editted.date = model.date,
        editted.image = model.image,
        editted.description = model.description,

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
    changed.rating += 1;
    changed.votes.push(userId);
    changed.save();
}

async function voteDown(modelId, userId) {
    let changed = await Model.findById(modelId);
    changed.rating -= 1;
    changed.votes.push(userId);
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
    voteDown,
    voteUp,
    getByPosts,
}