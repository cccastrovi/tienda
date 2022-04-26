const faker = require('faker');
const boom = require('@hapi/boom');

const getConnection = require('../librerias/coneccion.js');

class usuariosServicios{

    constructor(){
        this.usuarios = [];
        this.generarUsuarios();
    }

    async generarUsuarios(){
        const limite = 10;
        for (let index = 0; index < limite; index++) {
            this.usuarios.push({
                IdUsuario: faker.datatype.uuid(),
                nombre: faker.name.firstName(),
                apellido: faker.name.lastName(),
                direccion:faker.address.cardinalDirection(),
            });   
        };
    }

    async find(){
        const client = await getConnection();
        const rta = await client.query('SELEC * FROM usuario');
        return rta.rows;
    }

    /*buscarUsuarios(){
        return this.usuarios;
    }*/


}

module.exports = usuariosServicios;