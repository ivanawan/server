const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Book=sequelize.define('Book', {
    id:{ type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
  title:{type: DataTypes.STRING},
  publicationDate:{type:  DataTypes.DATE},
  pages:{type: DataTypes.INTEGER},
  ISBN:{type: DataTypes.STRING},
  price:{type:DataTypes.INTEGER},
  author:{type: DataTypes.STRING},
  description:{type:  DataTypes.STRING},
  bookAttachment: {type: DataTypes.STRING},
  thumbnail: {type: DataTypes.STRING},
});

module.exports = Book;