const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'asdlujcygnhwdsa';

function getAuthor(id) {
    return User.findById(id);
}

async function register(username, email, password) {
    //const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email or password don\'t match!');
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
    const user = await User.findOne({email: email}).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const isEqual = await bcrypt.compare(password, user.hashedPassword);

    if (!isEqual) {
        throw new Error('Invalid email or password!');
    }
    
    return createSession(user);
}

function createSession({ _id, email, username }) {
    const payload = {
        _id,
        email,
        username,
    }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}


module.exports = {
    register,
    login,
    verifyToken,
    getAuthor
};