const express = require('express');
const cocinerosRouter = express.Router();
const Cocinero = require('../models/Cocinero');
const { verifyToken } = require('../utils/middlewares');

// cocinerosRouter.use(verifyToken);

cocinerosRouter.get("/", (req, res, next) => {
    Cocinero.find({}).then(cocineros => {
        // console.log("GET ALL")
        res.json(cocineros);
    }).catch(err => {
        next(err);//
        // res.status(500).send({ error: "Error al traer los cocineros de la DB" }).end();
    });
});

cocinerosRouter.get("/:id", verifyToken, (req, res, next) => {
    const id = req.params.id;
    Cocinero.findById(id).then(cocinero => {
        !cocinero
            ? res.status(404).send({ error: "no se encontro ningun cocinero con ese ID" }).end()
            : res.json(cocinero);

    }).catch(err => {
        next(err);
    })
});
cocinerosRouter.delete("/:id", verifyToken, (req, res, next) => {
    const id = req.params.id;
    Cocinero.findByIdAndRemove(id).then(cocineroEliminado => {
        cocineroEliminado
            ? res.status(200).send({ message: "Usuario eliminado" })
            : res.status(404).send({ error: "id not found", message: "El id del cocinero no existe " });
    }).catch(err => {
        console.log("mensaje(cocinerosRouter.delete)", err.message)
        next(err);
        // res.status(400).end();
    });

});

cocinerosRouter.post("/", verifyToken, (req, res, next) => {
    const { nombre, especialidad, edad, favorito, cantCapitulos } = req.body;
    if (!nombre || !especialidad || !edad || !cantCapitulos) res.status(400).send({ error: "Falta uno o mas campos al Cocinero" }).end();

    const newCocinero = new Cocinero({
        nombre,
        especialidad,
        edad,
        favorito,
        cantCapitulos
    });

    newCocinero.save()
        .then(cocinero => {
            res.status(201).json(cocinero);
        }).catch(err => {
            // console.log(err)
            next(err);
            // res.status(500).send({ error: "Error al insertar el cocinero a la DB." }).end();
        });
});


cocinerosRouter.put("/:id", verifyToken, (req, res, next) => {
    const { nombre, edad, especialidad, favorito, cantCapitulos } = req.body;
    if (!nombre || !edad || !especialidad || !cantCapitulos) res.status(400).send({ error: "Falta uno o mas campos del cocinero." }).end();

    const id = req.params.id;
    const infoCocinero = { nombre, edad, especialidad, favorito, cantCapitulos };
    Cocinero.findByIdAndUpdate(id, infoCocinero, { new: true })
        .then(cocineroModificado => {
            // console.log("COCINERO MODIFICACO API" + cocineroModificado);
            cocineroModificado ? res.json(cocineroModificado) : res.status(404).send({ error: "no se encontro ese id" }).end();
        }).catch(err => {
            next(err);
            // res.status(500).send({ error: "Error al intentar actualizar un cocinero" }).end();
        });
});

module.exports = cocinerosRouter;