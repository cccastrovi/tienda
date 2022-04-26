const boom = require('@hapi/boom');

function validadorHandler(schema, property){
    return (req, res, next) => {
        const dato = req[property];
        const {error} = schema.validate(dato,{abortEarly:false});
        if(error){
            next(boom.badRequest(error));
        }else{
            next();
        };
    };
};

module.exports = validadorHandler;