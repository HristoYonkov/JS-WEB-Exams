const { Schema, model, Types } = require('mongoose');

const URL_PATTEERN = /^https?:\/\/.+$/i;

const modelSchema = new Schema({
    title: { type: String, required: true, 
        minlength: [6, 'Title should be at least 6 characters!'] 
    },
    keyword: { type: String, required: true, 
        minlength: [6, 'Keyword should be at least 6 characters long!'] 
    },
    location: { type: String, required: true, 
        minlength: [15, 'Location should be at least 15 characters long!'] 
    },
    date: { type: String, required: true, 
        minLength: 10,
        maxLength:10,
        count: [10, 'Date should be exacly 10 characters long!']
    },
    image: { type: String, required: true, validate: {
        validator: (value) => URL_PATTEERN.test(value),
        message: 'Image URL is not valid!'
    }},
    description: { type: String, required: true, 
        minlength: [8, 'Description should be at least 8 characters long!'] 
    },
    rating: {
        type: Number,
        default: 0
    },
    author: { type: Types.ObjectId, ref: 'User' },

    votes: { type: [Types.ObjectId], ref: 'User', default: [] },

});

const Model = model('Model', modelSchema);

module.exports = Model;