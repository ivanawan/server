const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Transaction =sequelize.define('Transaction', {
   id:{ type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true},
  userId: DataTypes.INTEGER,
  attachment:{type: DataTypes.STRING , allowNull:true},
  totalPayment: DataTypes.INTEGER,
  status:{type:DataTypes.STRING,defaultValue: "Pending"},
});

module.exports = Transaction ;