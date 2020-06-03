const Sequelize = require('sequelize');
const sequelize = require('../database');

const Libro = sequelize.define('libro',{
    idLibro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombreLibro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // descripcionLibro: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    annoEdicion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlFile: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nombreAutor: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    nombreEditorial: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    urlImg: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    
},
{
    tableName: 'libro'
})

module.exports = Libro; 