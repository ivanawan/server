const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const User =sequelize.define('User', {
  id:{ type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true},
  fullName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  status:{type: DataTypes.STRING,defaultValue: "USER"},
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = User;