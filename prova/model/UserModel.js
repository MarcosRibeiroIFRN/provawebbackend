const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = User;
