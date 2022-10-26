// TODO: Take model according to the assignment!
const Book = require('../models/Book');

function getAll() {
    return  Book.find();
}

function findConnection(userId) {
    return  Book.find({wishingList: userId});
}

function getOne(id) {
    return Book.findById(id);
}

async function create(book, userId) {
    
    return await Book.create({
        title: book.title,
        author: book.author,
        image: book.image,
        review: book.review,
        genre: book.genre,
        stars: book.stars,
        owner: userId
    });
}

async function edit(id, book) {
    const editted = await Book.findById(id)
    editted.title = book.title
    editted.author = book.author
    editted.genre = book.genre
    editted.stars = book.stars
    editted.image = book.image
    editted.review = book.review
    await editted.save();
}

async function deleteById(id) {
    return await Book.findByIdAndDelete(id);
}

async function wish(id, userId) {
    return await Book.findByIdAndUpdate(id,{wishingList: userId});
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