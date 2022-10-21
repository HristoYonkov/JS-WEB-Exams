const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'asdlujcygnhwdsa';

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username already exist!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    // TODO: See assignment if registration creates user session?...
    const token = createSession(user);
    return token;
}

async function login() {

}

function verifyToken() {

}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken
};