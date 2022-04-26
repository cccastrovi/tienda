const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../librerias/pool');

class ProductosServicios {

    constructor (){
        this.productos = [];
        this.generar();
        this.pool = pool;
        this.pool.on('error',(error) => console.error(error));
    }

    async generar(){
        const limite = 10;
        for(let index = 0; index < limite; index++){
            this.productos.push({
                IdProducto: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(),10),
                imange: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }

    async create(dato){
        const nuevoProducto = {
            IdProducto: faker.datatype.uuid(),
            ...dato
        }
        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }

    async buscar(){
        const query = 'SELECT * FROM productos';
        const rta = await this.pool.query(query);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(rta.rows)
            }, 2000);
        });
    }

    async buscarUno(IdProducto){
        const producto = this.productos.find(item => item.IdProducto === IdProducto);
        if(!producto){
            throw boom.notFound('producto no encontrado');
        }if(producto.isBlock){
            throw boom.conflict('producto bloqueado');
        }else{
            return producto;
        }
    }

    async actualizar(IdProducto,cambio){
        const index = this.productos.findIndex(item =>item.IdProducto === IdProducto);
        if (index === -1) {
            throw boom.notFound('Producto no encontrado');
        } else {
            const productos = this.productos[index];
            this.productos[index] = {
                ...productos,
                ...cambio
            };
            return this.productos[index];
        }
    }

    async eliminar(IdProducto){
        const index = this.productos.findIndex(item => item.IdProducto === IdProducto);
        if(index === -1){
            throw boom.notFound('Producto no encontrado');
        }else{
            this.productos.splice(index,1);
            return {message:'El producto fue eliminado: ' + IdProducto};
        }
    }
}

module.exports = ProductosServicios;