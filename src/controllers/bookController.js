const { Book, PurchasesBook } = require("../../models");

/**
 * GET all data 
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
 async function getAll(req, res, next) {
    try {
        const books= await Book.findAll();
        return res.json({
            status: "success",
            data:{
              books
            }
          });
  
    } catch (err) {
      console.log("function getAll err =>", err);
      return res.json({
        status: "error",
        message: "server err",
      });
    }
  }
  
  /**
   * GET one data by id
   * @param {object} req => get all data from request 
   * @param {object} res => return value to user
   * @param {object} next => return next argument
   * @returns json 
   */
  async function getOne(req, res, next) {
    try {
        const book= await Book.findOne({where:{id:req.params.id}});
        return res.json({
            status: "success",
            data:{
              book
            }
          });
  
    } catch (err) {
      console.log("function getOne err =>", err);
      return res.json({
        status: "error",
        message: "server err",
      });
    }
  }
  
  /**
   * Insert one data to database
   * @param {object} req => get all data from request 
   * @param {object} res => return value to user
   * @param {object} next => return next argument
   * @returns json 
   */
  async function insert(req, res, next) {
    try {
//  console.log(req.files["bookAttachment"][0].filename);
     req.body.bookAttachment=req.files["bookAttachment"][0].filename;
     req.body.thumbnail=req.files["thumbnail"][0].filename;

     const book=await Book.create(req.body);
     return res.json({
        status: "success",
        data:{
          book
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
  
  
  async function download(req,res,next){
    const mybook =  await PurchasesBook.findOne({where:{BookId:req.params.book,UserId:req.params.id}});
    if(mybook !== null){
     const book= await Book.findOne({where:{id:req.params.book}});
     if(book === null){
      return res.json({
        status: "error",
        message: "not found",
      });
     }
     const file = `${__dirname}/../../public/upload/${book.bookAttachment}`;
     res.download(file);
    }else{
      return res.json({
        status: "error",
        message: "not found",
      });
    }

   }
  
  /**
   * Update one data by id 
   * @param {object} req => get all data from request 
   * @param {object} res => return value to user
   * @param {object} next => return next argument
   * @returns json 
   */
  async function update(req, res, next) {
    try {
  
  
    } catch (err) {
      console.log("function update err =>", err);
      return res.json({
        status: "error",
        message: "server err",
      });
    }
  }
  
  /**
   * DELETE one data by id 
   * @param {object} req => get all data from request 
   * @param {object} res => return value to user
   * @param {object} next => return next argument
   * @returns json 
   */
  async function destroy(req, res, next) {
    try {
  
      
    } catch (err) {
      console.log("function destroy err =>", err);
      return res.json({
        status: "error",
        message: "server err",
      });
    }
  }
  
  
  module.exports={getAll,getOne,insert,update,destroy,download};