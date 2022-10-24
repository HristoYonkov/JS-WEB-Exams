const Book = require('../models/Book');

function getAll() {
    return  Book.find();
}

function getOne(id) {
    return Book.findById(id);
}

async function create(book, userId) {
    
    return await Book.create({
        title: book.title,
        author: book.author,
        image: book.image,
        bookReview: book.review,
        genre: book.genre,
        stars: book.stars,
        owner: userId
    });
}

async function edit(id, book) {
    const editted = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        stars: book.stars,
        image: book.image,
        bookReview: book.review
    }
    console.log(editted);
    return await Book.findByIdAndUpdate(id, editted)
}

async function deleteById(id) {
    return await Book.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    create,
    getOne,
    edit,
    deleteById
}