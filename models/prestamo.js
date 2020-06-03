const Sequelize = require('sequelize');
const sequelize = require('../database');

const Prestamo = sequelize.define('prestamo',{
    idPrestamo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fechaPrestamo: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    fechaDevolucion: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    estadoDevolucion: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    comentario: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Sin Comentarios'
    },
},
{
    tableName: 'prestamo'
})


module.exports = Prestamo; 