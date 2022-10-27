const { Schema, model } = require('mongoose');
const EMAIL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/i

// TODO: Add user properties and validation according to assignment!...
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [4, 'Username must be at least 4 characters long!'] },
    email: { type: String, unique: true, required: true, 
        minlength: [10, 'Email must be at least 10 characters long!'],
        validate: {
            validator: function (data) {
                return EMAIL_PATTERN.test(data)
            },
           message: 'Email is not valid!'
        }
    },
    hashedPassword: { type: String, required: true, minlength: [3,'Password must be at least 3 characters long!'] }
});

userSchema.index({ username: 1 }, {
    collation: 'en',
    strength: 2
});
userSchema.index({ email: 1 }, {
    collation: 'en',
    strength: 2
});

const User = model('User', userSchema);

module.exports = User;