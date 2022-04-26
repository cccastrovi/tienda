const Joi = require('joi');

const IdProducto = Joi.string().uuid();
const nombre = Joi.string().min(5).max(15);
const precio = Joi.number().integer().min(10);
const imagen = Joi.string().uri();

const crearEsquemaProducto = Joi.object({
    nombre: nombre.required(),
    precio: precio.required(),
    imagen: imagen.required(),
});

const actualizarEsquemaProducto = Joi.object({
    nombre: nombre,
    precio: precio,
    imagen: imagen,
});

const buscarEsquemaProducto = Joi.object({
    IdProducto: IdProducto.required(),
});

module.exports = {crearEsquemaProducto, actualizarEsquemaProducto, buscarEsquemaProducto};