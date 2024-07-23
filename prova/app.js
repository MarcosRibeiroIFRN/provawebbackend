const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConfig');
const userRoutes = require('./routes/Rotas');
require('dotenv').config();
const app = express();
const PORT = 3306;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server conectado na porta ${PORT}`);
    });
}).catch(error => {
    console.error('Conexão falhou:', error);
});
