const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Purchase =sequelize.define('Purchase', {
},{timestamps: false});

module.exports =  Purchase ;