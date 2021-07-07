require('./db/mongo.js');
const Cocinero = require('./models/Cocinero');
const express = require('express');
const app = express();
const { PORT } = require('./utils/config');
const { handlerError, logger } = require('./utils/middlewares');
const cors = require("cors");
const cocinerosRouter = require('./routes/cocinerosRouter');
const loginRouter = require('./routes/loginRouter');
const usersRouter = require('./routes/usersRouter');

const espera = (req, res, next) => {
    setTimeout(() => {
        return next();
    }, 1000);
}

app.use(logger);
app.use(express.json()); //middlerware que parcea el body del request
app.use(espera);
app.use(cors());
app.use('/api/cocineros', cocinerosRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(handlerError)
// app.use(handlerNotFound);


app.listen(PORT, () => {
    console.log("server escuchando en port: ", PORT);
})
