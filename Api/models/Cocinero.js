const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const cocineroSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            maxLength: 25
        },
        especialidad: {
            type: String,
            required: true,
            maxLength: 35
        },
        edad: {
            type: Number,
            required: true,
            min: 18,
            max: 65
        },
        cantCapitulos: {
            type: Number,
            required: true,
            min: 1,
            max: 100
        },
        favorito: Boolean
    }
);
cocineroSchema.set('toJSON', {
    transform: ((document, cocineroToJSON) => {
        cocineroToJSON.id = cocineroToJSON._id.toString();
        delete cocineroToJSON._id;
        delete cocineroToJSON.__v;
    })
});
module.exports = model('Cocinero', cocineroSchema);
