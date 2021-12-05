'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Logs extends Model {

        static associate(models) {

        }
    };
    Logs.init({
        name: DataTypes.STRING,
        datetime: DataTypes.DATE(6),
        ip: DataTypes.STRING(15),
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Logs',
    });
   // Logs.sync({ alter: true })
    return Logs;
};