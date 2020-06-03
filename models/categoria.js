const Sequelize = require('sequelize');
const sequelize = require('../database');

const Categoria = sequelize.define('categoria',{
    idCategoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCategoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
    }
},
{
    tableName: 'categoria'
})

module.exports = Categoria; 