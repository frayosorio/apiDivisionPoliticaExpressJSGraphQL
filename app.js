const express = require('express');
const app = express();

const graphqlHTTP = require('express-graphql').graphqlHTTP;




const puerto = 3010;
app.listen(puerto, () => {
    console.log(`Servicio de BD División Política escuchando en http://localhost:${puerto}`);
})