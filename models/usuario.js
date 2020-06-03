const Sequelize = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('usuario',{
    rut: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    clave: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fono: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    tipoUsuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    primerApellido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    segundoApellido: {
        type: Sequelize.STRING,
        allowNull: true
    },
},
{
    tableName: 'usuario'
})

module.exports = Usuario;