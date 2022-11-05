const Pais = require("../modelos/pais.modelo");

const buscarRegion = async (idPais, nombreRegion) => {
    const regionesEncontradas = await Pais.aggregate([
        { $match: { id: idPais } },
        {
            $project: {
                regiones: {
                    $filter: {
                        input: '$regiones',
                        as: 'region',
                        cond: { $eq: ['$$region.nombre', nombreRegion] }
                    }
                }
            }
        },
        { $unwind: '$regiones' },
        {
            $project: {
                nombre: '$regiones.nombre',
                area: '$regiones.area',
                poblacion: '$regiones.poblacion'
            }
        }
    ]);
    if (regionesEncontradas) {
        return regionesEncontradas[0];
    }
}


exports.solucionadorRegion = {

    Query: {
        obtenerRegiones: (parent, args, context, info) => {
            console.log(`Listando Regiones del país con id=${args.idPais}`);
            return Pais.aggregate([
                { $match: { id: args.idPais } },
                { $unwind: '$regiones' },
                {
                    $project: {
                        nombre: '$regiones.nombre',
                        area: '$regiones.area',
                        poblacion: '$regiones.poblacion'
                    }
                }
            ]);
        },
        obtenerRegion: (parent, args, context, info) => {
            console.log(`Mostrando región con nombre=${args.nombre} del país con id=${args.idPais}>`);
            return buscarRegion(args.idPais, args.nombre);
        }
    },
    Mutation: {
        agregarRegion: (parent, args, context, info) => {
            console.log(`Agregando pais con id=${args.id}`);
            return Pais.create({
                id: args.id,
                nombre: args.nombre,
                continente: args.continente,
                tipoRegion: args.tipoRegion,
                codigoAlfa2: args.codigoAlfa2,
                codigoAlfa3: args.codigoAlfa3
            });
        },
        modificarRegion: (parent, args, context, info) => {
            console.log(`Modificando pais con id=${args.id}`);
            return Pais.findOneAndUpdate(
                {
                    id: args.id
                },
                {
                    nombre: args.nombre,
                    continente: args.continente,
                    tipoRegion: args.tipoRegion,
                    codigoAlfa2: args.codigoAlfa2,
                    codigoAlfa3: args.codigoAlfa3
                });
        },
        eliminarRegion: (parent, args, context, info) => {
            console.log(`Eliminando pais con id=${args.id}`);
            return Pais.findOneAndDelete({
                id: args.id
            });
        }
    }

}