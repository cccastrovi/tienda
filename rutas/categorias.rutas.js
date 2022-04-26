const express = require('express');

const categoriasServicios = require('./../servicios/categorias.servicios');

const rutas = express.Router();
const servicios = new categoriasServicios;

rutas.get('/',(req,res) => {
    const categorias = servicios.buscarCategorias();
    res.json(categorias);
});

rutas.get('/:categoriaId',(req,res) => {
    const{categoriaId} = req.params;
    res.json({
        categoriaId,
        nombre: 'electronicos',
    });
});

rutas.post('/',(req,res) => {
    const body = req.body;
    res.json({
        message: 'ha sido creado',
        data: body,
    });
});

rutas.patch('/:idCategoria', (req,res) => {
    const{idCategoria} = req.params;
    const body = req.body;
    res.json({
        message: 'Modificado',
        data:body,
        idCategoria,
    });
});

rutas.delete('/:idCategoria',(req,res) => {
    const{idCategoria} =req.params;
    res.json({
        message:'eliminado',
    })
})

module.exports = rutas;