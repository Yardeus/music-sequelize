'use strict';

const Author = require('./author')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {

    static associate(models) {

    }
  };

  Music.init({
    name: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Music',
  });



  Music.sync({ force: true })
  return Music;
};