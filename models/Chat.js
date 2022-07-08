const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    idsender:{
        type:DataTypes.INTEGER,
        allowNull:false  
    },
    idreceiver:{
        type:DataTypes.INTEGER,
        allowNull:false  
      },
    chat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

module.exports = Chat;