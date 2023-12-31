const express = require('express');
const app = express(); 
const routes = require('./routes');

app.use(express.json()); 

app.use('/api/anime', routes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`)); 

module.exports = app;