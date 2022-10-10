const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(express.urlencoded());
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "x-access-token");
    app.use(cors());
    next();
})

const corsConfig = {
    origin: "*",
    optionSuccessStatus: 200
}

app.use(routes);

//not found para rotas erradas
app.use((req, res, next) => {
    const error = new Error('Not Found Rout');
    error.status = 404;
    next(error)
})

//configurando mensagens de erro
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

app.listen(3333, () => console.log('Servidor rodando'));