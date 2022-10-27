const { Schema, model, Types } = require('mongoose');

const URL_PATTEERN = /^https?:\/\/.+$/i;

const modelSchema = new Schema({
    title: { type: String, required: true, 
        minlength: [4, 'Title should be at least 4 characters!'] 
    },
    description: { type: String, required: true,
        maxlength: [200, 'Description should be maximum 200 characters long!'] 
        
    },
    category: { type: String, required: true, 
        values: ['vehicles', 'estate', 'electronics', 'furniture', 'other'],
        message: ['Category should be Vehicles, Real Estate, Electronics, Furniture, Other!'],
    },
    image: { type: String, required: true, 
        validate: {validator: (value) => URL_PATTEERN.test(value),
            message: 'Image URL is not valid!'
        },
    },
    price: { type: Number, required: true,
        min: [1, 'Price should be a positive number!'], 
    },
    bidder: { type: Types.ObjectId, ref: 'User'},
    author: { type: Types.ObjectId, ref: 'User' }

});

const Model = model('Model', modelSchema);

module.exports = Model;