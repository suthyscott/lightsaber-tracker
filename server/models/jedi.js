const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Jedi: sequelize.define('jedi', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
    }) 
}