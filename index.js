require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const bodyParser = require('body-parser')
const port = 5000
const io = new Server(httpServer, { cors: {origin: '*' } });
const index_route = require('./src/routes/index');
const sequelize = require('./config/db_connection');
const index = require('./models/index');
const {PurchasesBook}= require('./models/index');

/**
 *    +++++++++++++++   cors & header    +++++++++++++++
 */ 

 app.use(cors());
 app.use(function (req, res, next) {
   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
 });
 
 /**
  *    +++++++++++++++   body parser    +++++++++++++++
  */ 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));


/**
 *    +++++++++++++++   import route    +++++++++++++++
 */ 
app.use("/public", express.static(__dirname + "/public"));
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
app.get('/', (req, res) =>{res.send('Hello finaltask api v.1.00 !')});
app.use('/',index_route);


/**
 *    +++++++++++++++   Socket IO    +++++++++++++++
 */ 



/**
 *    +++++++++++++++   db connection     +++++++++++++++
 */ 

 const initApp = async () => {
  console.log("Testing the database connection..");
   try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
       /**
       * Syncronize the Post model.
       */
      await sequelize.sync();
      // await PurchasesBook.sync({force:true});
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};
/**
* Initialize the application.
*/
initApp();