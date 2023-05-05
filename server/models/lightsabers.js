const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Lightsabers: sequelize.define('lightsabers', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        desc: DataTypes.STRING,
        dualBlade: DataTypes.BOOLEAN
    }) 
}