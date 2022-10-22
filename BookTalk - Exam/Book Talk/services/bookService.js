const Book = require('../models/Book');

function getAll() {
    return  Book.find();
}

function create(book) {

    return Book.create({
        title: book.title,
        author: book.author,
        image: book.image,
        bookReview: book.rivew,
        genre: book.genre,
        stars: book.stars,
        wishingList: { type: [Types.ObjectId], ref: 'User', default: [] },
        owner: { type: Types.ObjectId, ref: 'User' }

    });
}


module.exports = {
    getAll,
}