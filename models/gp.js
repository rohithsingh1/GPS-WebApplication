'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gp.init({
    //id:DataTypes.INTEGER,
    DeviceId: DataTypes.STRING,
    DeviceType: DataTypes.STRING,
    Timestamp: DataTypes.DATE,
    Location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gp',
  });
  return Gp;
};