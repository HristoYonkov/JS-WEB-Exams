const { Schema, model, Types } = require('mongoose');

// TODO: Add user properties and validation according to assignment!...
const userSchema = new Schema({
    firstname: { 
        type: String, required: true, 
        minlength: [3, 'First name must be at least 3 characters long!'], 
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letters and numbers'] 
    },
    lastname: { 
        type: String, required: true, 
        minlength: [5, 'Lastname name must be at least 5 characters long!'], 
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letters and numbers'] 
    },
    email: { type: String, unique: true, required: true, 
        minlength: [10, 'Email must be at least 10 characters long!']
    },
    hashedPassword: { type: String, required: true, 
        minlength: [4,'Password must be at least 4 characters long!'] 
    },
    posts: { type: [Types.ObjectId], ref: 'Model', default: [] },
});

// userSchema.index({ username: 1 }, {
//     collation: 'en',
//     strength: 2
// });
userSchema.index({ email: 1 }, {
    collation: 'en',
    strength: 2
});

const User = model('User', userSchema);

module.exports = User;