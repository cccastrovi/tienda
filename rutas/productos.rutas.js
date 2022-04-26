const express = require('express');

const ProductosServicios = require('./../servicios/productos.servicios');
const validadorHandler = require('./../middlewares/validador.handler');
const {crearEsquemaProducto, actualizarEsquemaProducto, buscarEsquemaProducto} = require('./../esquemas/producto.esquema');

const rutas = express.Router();
const servicios = new ProductosServicios();

rutas.get('/',async (req,res) => {
    const productos = await servicios.buscar();
    res.json(productos); 
});

rutas.get('/:IdProducto',validadorHandler(buscarEsquemaProducto, 'params'),async (req,res, next) => {
    try {
        const {IdProducto} = req.params;
        const producto = await servicios.buscarUno(IdProducto);
        res.json(producto);
    } catch (error) {
        next(error);
    }
});

rutas.get('/:idProducto/:idCategoria',(req,res) =>{
    const{idProducto,idCategoria} = req.params;
    res.json({
        idProducto,
        idCategoria,
    });
});

rutas.post('/',validadorHandler(crearEsquemaProducto,'body'),async (req,res) => {
    const body = req.body;
    const nuevoProducto = await servicios.create(body);
    res.json(nuevoProducto); 
});

rutas.patch('/:IdProducto',
validadorHandler(buscarEsquemaProducto,'params'),
validadorHandler(actualizarEsquemaProducto,'body'),
async (req,res) => {
    try {
        const {IdProducto} = req.params;
        const body = req.body;
        const producto = await servicios.actualizar(IdProducto, body);
        res.json(producto);
    } catch (error) { 
        next(error);
    }
    
});

rutas.delete('/:IdProducto',async (req,res) => {
    const {IdProducto} = req.params;
    const respuesta = await servicios.eliminar(IdProducto);
    res.json(respuesta);
});

module.exports = rutas;
