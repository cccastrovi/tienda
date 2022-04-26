const express = require('express');


const usuariosServicios = require('./../servicios/usuarios.servicios');

const rutas = express.Router();
const servicios = new usuariosServicios();

rutas.get('/',async (req, res, next) => {
    try {
        const usuarios = await servicios.find();
        res.json(usuarios);  
    } catch (error) {
        next(error);
    }  
});

module.exports = rutas;