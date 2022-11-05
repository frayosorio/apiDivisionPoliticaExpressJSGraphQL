const mongo = require("mongoose");
const Esquema = mongo.Schema;

const ciudadEsquema=require("./ciudad.modelo");

const regionEsquema = new Esquema(
    {
        nombre:{
            type: String,
            required: true
        },
        area:{
            type: Number,
            required: false
        },
        poblacion:{
            type: Number,
            required: false
        },
        ciudades: [ ciudadEsquema ]
    }
);

module.exports = regionEsquema;