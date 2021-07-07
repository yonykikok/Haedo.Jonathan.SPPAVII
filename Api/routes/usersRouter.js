const express = require('express');
const usersRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
// const { verifyToken } = require('../utils/middlewares');
// usersRouter.use(verifyToken);
/*verifyToken,*/

usersRouter.get('/', async (req, res, next) => {

    try {
        const users = await User.find({});
        res.json(users);

    } catch (err) {
        next(err);
    }
});

/*
    inscripcion 4000
    materiales 3000
    
*/

usersRouter.post('/getMyPassword/', async (req, res, next) => {
    let reqUser = req.body;
    const { passwordHash } = await User.findOne(reqUser);
    if (passwordHash) {

        res.status(200).json({passwordHash});
        console.log("Tengo el hash! ", passwordHash);
        console.log("Pero esta caca creo que no desencripta -.-");
        // const originalPassword=await bcrypt.
        // const originalPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;

    } else {

        console.log("NO ENCONTRO!",);
    }

});

usersRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    console.log("REQ BODY      --", username + "  " + password);
    // if (password.length != 6) next({ name: "ValidationError", message: "El password debe ser de 6 caracteres" });

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username,
            passwordHash
        });

        const user = await User.findOne({ username: newUser.username });//verifico si existe otro usuario con ese username

        if (!user) {
            const userSaved = await newUser.save();
            return res.status(201).json(userSaved);
        } else {
            return next({ name: "CuentaExistente", message: "El 'username' que trata de usar ya se encuentra registrado" });
        }

    } catch (err) {
        next(err);
    }
});



module.exports = usersRouter;