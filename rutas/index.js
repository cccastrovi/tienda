const express = require('express');
const productosRutas = require('./productos.rutas.js');
const usuariosRutas = require('./usuarios.rutas.js');
const categoriasRutas = require('./categorias.rutas.js');

function rutasApi(app){
    const rutas = express.Router();
    app.use('/api/v1',rutas);
    rutas.use('/productos',productosRutas);
    rutas.use('/usuarios', usuariosRutas);
    rutas.use('/categorias',categoriasRutas);
}

module.exports = rutasApi;