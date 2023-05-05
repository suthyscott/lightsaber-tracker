const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    SaberColors: sequelize.define('saber_colors', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        colorName: DataTypes.STRING
    }) 
}