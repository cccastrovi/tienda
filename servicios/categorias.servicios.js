
const faker = require('faker');

class categoriasServicios{

    constructor(){
        this.categorias = [];
        this.generaraCategorias();
    }

    generaraCategorias(){
        const limite = 10;
        for (let index = 0; index < limite; index++) {
            this.categorias.push({
                IdCategoria: faker.datatype.uuid(),
                nombre: faker.name.gender(),
                cantidad: parseInt(faker.commerce.price(),10),
            });  
        }
    }

    buscarCategorias(){
        return this.categorias;
    }
}

module.exports = categoriasServicios;