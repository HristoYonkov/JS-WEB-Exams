const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'asdlujcygnhwdsa';

async function register(username, email, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Email already exist!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        hashedPassword
    });

    // TODO: See assignment if registration creates user session?...
    const token = createSession(user);
    return token;
}

async function login(email, password) {
    const user = await User.findOne({email: email});
    const isEqual = await bcrypt.compare(password, user.hashedPassword);
    if (!isEqual) {
        throw new Error('Wrong password!');
    }
    
    return createSession(user);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
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