const express = require('express');
const loginRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        const correctPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;
        if (!correctPassword) {
            return next({ name: "ValidationError", message: "Usuario o Password invalidos" });
        }

        const userToken = {
            username: user.username,
            id: user._id
        }
        const token = await jwt.sign(userToken, SECRET, { expiresIn: "30s" });
        return res.status(200).json(token);


    } catch (err) {
        next(err)
    }
})

module.exports = loginRouter;

