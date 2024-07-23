const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cadastro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
