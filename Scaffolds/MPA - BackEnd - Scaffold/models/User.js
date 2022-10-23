const { Schema, model } = require('mongoose');

// TODO: Add user properties and validation according to assignment!...
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, 'Username must be at least 3 characters long'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({username: 1}, {
    collation: 'en',
    strength: 2
});

const User = model('User', userSchema);

module.exports = User;