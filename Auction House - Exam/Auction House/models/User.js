const { Schema, model } = require('mongoose');
const EMAIL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/i
// TODO: Add user properties and validation according to assignment!...
const userSchema = new Schema({
    firstname: { 
        type: String, required: true, unique: true, 
        minlength: [1, 'First name must be at least 1 characters long!'], 
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letters and numbers'] 
    },
    lastname: { type: String, required: true, unique: true, 
        minlength: [1, 'Last name must be at least 1 characters long!'], 
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letters and numbers'] 
    },
    email: { type: String, unique: true, required: true, 
        minlength: [10, 'Email must be at least 10 characters long!'],
        validate: {
            validator: function (data) {
                return EMAIL_PATTERN.test(data)
            },
           message: 'Email is not valid!'
        }
    },
    hashedPassword: { type: String, required: true, 
        minlength: [5,'Password must be at least 5 characters long!'] 
    }
});

userSchema.index({ firstname: 1 }, {
    collation: 'en',
    strength: 2
});
userSchema.index({ email: 1 }, {
    collation: 'en',
    strength: 2
});

const User = model('User', userSchema);

module.exports = User;