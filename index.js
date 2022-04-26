const express = require('express');
const cors = require('cors');
const rutasApi = require('./rutas');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080','hpps://myapp.co'];
const opciones = {
    origen: (origen, callback) => {
        if(whitelist.includes(origen) || !origen){
            callback(null, true);
        }else{
            callback(new Error('no permitido'));
        }
    }
};

app.use(cors(opciones));

app.get('/',(req,res) => {
    res.send('hola mundo');
})

//creacion de una nueva ruta
app.get('/nueva-ruta',(req,res) => {
    res.send('Soy la nueva ruta');
});

app.listen(port, () => {
    console.log('mi port' + port);
});

rutasApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);