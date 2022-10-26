const { Schema, model, Types } = require('mongoose');

const URL_PATTEERN = /^https?:\/\/.+$/i;

const modelSchema = new Schema({
    name: { type: String, required: true, minlength: [2, 'Title should be at least 2 characters!'] },
    image: { type: String, required: true, validate: {
        validator: (value) => URL_PATTEERN.test(value),
        message: 'Image URL is not valid!'
    }},
    price: { type: Number, required: true, min: [0, 'Price should be a positive number!'] },
    description: { type: String, required: true, minlength: [10, 'Description should be at least 10 characters long!'] },

    payMethod: { type: String, required: true, enum: {
        values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        message: 'Pay method is not supported!'}
    },

    buyers: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' }

});

const Model = model('Model', modelSchema);

module.exports = Model;