const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { User,Chat } = require('../../models');

let connectedUser = {}

const socketIo = (io) => {
  
    io.use((socket, next) => {
        if (socket.handshake.auth && socket.handshake.auth.token ) {
            //  console.log(socket.handshake.auth && socket.handshake.auth.token);
                next();
            // })
        } else {
          next(new Error("Not Authorized"));
        }
      });

  

    io.on('connection', (socket) => {
      console.log('client connect id =>', socket.id);

      const {id:idUser} =jwt.verify(socket.handshake.auth.token,process.env.JWT_SECRET_KEY);
      connectedUser[idUser] = socket.id

      socket.on("load ADMIN contact", async () => {
        try {
          const adminContact = await User.findOne({
            where: {
              status: "ADMIN"
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          });
      console.log(adminContact);
        // emit event to send admin data on event “admin contact”
        socket.emit("ADMIN contact", adminContact)
        } catch (err) {
          console.log(err)
        }
      })

      socket.on("load USER contact", async () => {
        try {
          const adminContact = await User.findAll({
            where: {
              status: "USER"
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          });
       
        // emit event to send admin data on event “admin contact”
        socket.emit("USER contact", adminContact)
        } catch (err) {
          console.log(err)
        }
      })

      socket.on("load messages", async (payload) => {
        const idRecipient = payload;
        const idSender = idUser;
  
        const data = await Chat.findAll({
          where: {
            idsender: {
              [Op.or]: [idRecipient,idSender]
            },
            idreceiver: {
              [Op.or]: [idRecipient,idSender]
            },
          },
          attributes: {
            exclude: ['createdAt','updatedAt', 'idRecipient', 'idSender']
          },
          order: [['createdAt','ASC']]
        })
  
        socket.emit('messages',data)
      })

      socket.on("send message", async (payload) => {
        // console.log( payload);
        try {
          const { chat, idreceiver } = payload       
          
          await Chat.create({
            chat,
            idreceiver,
            idsender: idUser
          })
          
          io.to(socket.id).to(connectedUser[idreceiver]).emit("new message")
        } catch (error) {
          console.log(error)
        }
      })    

      socket.on('disconnect', () => {
        console.log('client disconnect', socket.id);
      })
  
    })
  }
  
  module.exports = socketIo