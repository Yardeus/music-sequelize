'use strict';

const Music = require('./music')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {

    static associate(models) {

    }
  };

  Author.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
  });



  //Author.sync({ force: true })
  return Author;
};