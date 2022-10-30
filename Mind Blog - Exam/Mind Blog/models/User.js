const { Schema, model, Types } = require('mongoose');

// TODO: Add user properties and validation according to assignment!...
const userSchema = new Schema({
    username: { 
        type: String, required: true, 
        minlength: [2, 'Username must be at least 2 characters long!'],
    },
    email: { type: String, unique: true, required: true, 
        minlength: [10, 'Email must be at least 10 characters long!']
    },
    hashedPassword: { type: String, required: true, 
        minlength: [4,'Password must be at least 4 characters long!'] 
    },
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