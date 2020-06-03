const Sequelize = require('sequelize')

const sequelize = new Sequelize('biblioteca','root','metallica1',
{
    dialect:'mysql',
    host:'localhost',
    port:3306
})

module.exports = sequelize;