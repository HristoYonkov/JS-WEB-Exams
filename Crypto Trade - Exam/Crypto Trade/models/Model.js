const { Schema, model, Types } = require('mongoose');

const URL_PATTEERN = /^https?:\/\/.+$/i;

const modelSchema = new Schema({
    title: { type: String, required: true, minlength: [2, 'Title should be at least 2 characters!'] },
    author: { type: String, required: true, minlength: [5, 'Author should be at least 5 characters!'] },
    image: { type: String, required: true, validate: {
        validator: (value) => URL_PATTEERN.test(value),
        message: 'Image URL is not valid!'
    }},
    review: { type: String, required: true, minlength: [10, 'Rivew should be at least 10 characters!'] },
    genre: { type: String, required: true, minlength: [3, 'Genre should be at least 2 characters!'] },
    stars: { type: Number, required: true, min: [1, 'Stars should be between 1 and 5!'], max: [5, 'Stars should be between 1 and 5!'] },
    wishingList: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' }

});

const Model = model('Book', bookSchema);

module.exports = Book;