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


module.exports = {
    getAll,
    create,
    getOne
}