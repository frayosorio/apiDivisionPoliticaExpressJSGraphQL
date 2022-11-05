const express = require('express');
const app = express();

const graphqlHTTP = require('express-graphql').graphqlHTTP;

//Conectarse a la base de datos
const bd = require('./modelos/bd');
bd.conectar();

//importar esquemas
const esquemaPais = require('./graphQL/pais.esquema');
const esquemaRegion = require('./graphQL/region.esquema');

//Definir ruta e iniciar GraphQL
app.use('/gqlpais', graphqlHTTP(
    {
        schema: esquemaPais,
        graphiql: true
    }
));

app.use('/gqlregion', graphqlHTTP(
    {
        schema: esquemaRegion,
        graphiql: true
    }
));

const puerto = 3010;
app.listen(puerto, () => {
    console.log(`Servicio de BD División Política escuchando en http://localhost:${puerto}`);
})