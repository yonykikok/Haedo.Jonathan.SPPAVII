const { connect } = require('mongoose');
const {DB_URI} = require('../utils/config');

const conectarDB = async () => {
    try {

        connect(DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });

    } catch (err) {

    }
};

conectarDB().then(result => {
    console.log("DB conectada");
}).catch(err => {
    console.log("Error al conectar a la DB");
});