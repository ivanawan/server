const { User, PurchasesBook, Book } = require("../../models");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");



async function login(req, res, next) {
  console.log('login here');
  try {
    const body = req.body;
    const rslt = await User.findOne({ where: { email: body.email } });

    if (!rslt)
      return res.json({ status: "error", message: " email not found" });

      if (bcrypt.compareSync(body.password, rslt.password) === true) {
        return res.json({
          status: "success",
          data:{
            user:{
              id:rslt.id,
              email:rslt.email,
              fullName:rslt.fullName,
              status:rslt.status,
              avatar:rslt.avatar,
              token:generateToken({ 
                id:rslt.id,
                email:rslt.email,
                fullName:rslt.fullName,
                status:rslt.status
              })
            }
          }
        });
      } else {
        return res.json({ status: "error", message: "Password not match" });
      }


  } catch (err) {
    console.log("function getAll err =>", err);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}

async function register(req, res, next) {
  try {
    const body = req.body;
    const find = await User.findOne({ where: { email: body.email } });
  
    if (find) {
      return res.json({
        status: "error",
        message: "email already use",
      });
    }

    const rslt = await User.create({
      fullName: body.fullName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 12),
    });

    return res.json({
      status: "success",
      data:{
        user:{
          id:rslt.id,
          email:rslt.email,
          fullName:rslt.fullName,
          status:rslt.status,
          avatar:null,
          token:generateToken({ 
            id:rslt.id,
            email:rslt.email,
            fullName:rslt.fullName,
            status:rslt.status
          })
        }
      }
    });

  } catch (err) {
    console.log("function insert err =>", err);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}

async function updateProfile(req,res,next){
  try {
    const data =req.body;
    data.avatar=req.file.filename;
    const user = await User.update(data,{where:{id:req.user.id} });

     return res.json({
       status: "success",
       data: user,
     });
 
   } catch (err) {
     console.log("function update err =>", err);
     return res.json({
       status: "error",
       message: "server err",
     });
   }
}

async function getProfile(req,res,next){
  try {
   const Profil = await User.findOne({where:{id:req.user.id}, 
    include:[{model:PurchasesBook,include:[{model:Book , attributes: { exclude: ["updatedAt","bookAttachment", "createdAt"] }}]}],
    attributes: { exclude: ["updatedAt","password","createdAt"] } });

    return res.json({
      status: "success",
      data: {Profil},
    });

  } catch (err) {
    console.log("function update err =>", err);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}



/**
 * to generate token jwt
 * @param {object} data 
 * @returns jwt token
 */
 function generateToken(data) {
  return jwt.sign(
    data,process.env.JWT_SECRET_KEY,
    { expiresIn: "86400s" }
  );
}

module.exports = { login,register ,getProfile,updateProfile};
