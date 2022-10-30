const { Schema, model, Types } = require('mongoose');

const URL_PATTEERN = /^https?:\/\/.+$/i;

const modelSchema = new Schema({
    title: { type: String, required: true, 
        minlength: [5, 'Title should be at least 5 characters!'],
        maxlength: [50, 'Title should be no longer than 50 characters!'],
    },
    image: { type: String, required: true, validate: {
        validator: (value) => URL_PATTEERN.test(value),
        message: 'Image URL is not valid!'
    }},
    content: { type: String, required: true, 
        minlength: [10, 'Content should be at least 10 characters long!'] 
    },
    category: { type: String, required: true, 
        minlength: [3, 'Category should be at least 3 characters long!'] 
    },
    follows: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' },
});

const Model = model('Model', modelSchema);

module.exports = Model;