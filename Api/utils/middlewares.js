const jwt = require("jsonwebtoken");
const { SECRET } = require('../utils/config');
const handlerNotFound = (req, res) => {
    res.status(200).json({ ok: false, error: "No existe ese recurso!" });

}


const logger = (req, res, next) => {
    // console.log(req.path);
    // console.log(req.method);
    next();
}
const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== "undefined") {
        req.token = bearerToken.split(' ')[1];
        try {
            const data = await jwt.verify(req.token, SECRET);
             console.log("DATA: ",data);
            console.log("POR ACA")
            next();
        } catch (err) {
            console.log("POR ALLA ", req.headers['authorization'])
            next(err);
        }

    } else {
        next({ name: "ErrorToken", message: "No ingreso el token" });
    }

}



const handlerError = (err, req, res, next) => {
    switch (err.name) {
        case "CastError":
        case "ErrorToken":
        case "SyntaxError":
        case "ReferenceError":
        case "ValidationError":
        case "JsonWebTokenError":
            res.status(400).json({ error: err.name, message: err.message });
            break;
        case "TokenExpiredError":
            res.status(401).json({ error: err.name, message: err.message });
            break;
        default:
            res.status(500).json({ error: err.name, message: err.message });
            break;
    }
    // console.log("NOMBRE---------------------" + err.name + " STATUS: " + err.message);
}



module.exports = {
    handlerNotFound,
    handlerError,
    logger,
    verifyToken
}
