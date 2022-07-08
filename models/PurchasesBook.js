const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const PurchasesBook =sequelize.define('PurchasesBook', {
 
},{timestamps: false});

module.exports = PurchasesBook;