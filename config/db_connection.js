
 const Sequelize = require("sequelize");

//  const sequelize = new Sequelize("FinalTask", "root", "", {
//      host: "127.0.0.1",
//      dialect: "mysql"
//  });
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
    }
  );
 
 module.exports = sequelize;