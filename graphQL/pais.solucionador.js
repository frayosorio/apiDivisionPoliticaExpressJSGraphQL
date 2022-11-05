const Pais = require("../modelos/pais.modelo");

exports.solucionadorPais = {

    Query: {
        obtenerPaises: (parent, args, context, info) => {
            console.log("Listando Paises");
            return Pais.find();
        },
        obtenerPais: (parent, args, context, info) => {
            console.log(`Mostrando pais con id=${args.id}`);
            return Pais.findOne({ id: args.id });
        }
    },
    Mutation: {
        agregarPais: (parent, args, context, info) => {

        },
        modificarPais: (parent, args, context, info) => {

        },
        eliminarPais: (parent, args, context, info) => {

        }
    }

}