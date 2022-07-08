const midtransClient = require("midtrans-client");
const { User,Transaction ,Purchase,Book,PurchasesBook } = require("../../models");


/**
 * GET all data 
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */

 async function getAll(req, res, next) {
    try {
     const transactions = await Transaction.findAll({include:[
      {model:User ,attributes: { exclude: ["updatedAt","password", "createdAt"] }},
      {model:Purchase ,include:[{model:Book, attributes: { exclude: ["updatedAt","bookAttachment", "createdAt"] }}]}
    ], attributes: { exclude: ["updatedAt","userId", "createdAt"] }
  });

    return res.json({
      status: "success",
      data:{transactions}
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
   * Insert one data to database
   * @param {object} req => get all data from request 
   * @param {object} res => return value to user
   * @param {object} next => return next argument
   * @returns json 
   */
  async function insert(req, res, next) {
    try {
       
        const id =parseInt(req.user.id+ Math.random().toString().slice(3, 8));

        const buyer= await User.findOne({where: { id : req.user.id}});

        if (buyer.phone=== null){
          return res.json({
            status:"error",
            message: "complete your profil before transaction"
          })
        }
        
        const rslt= await Transaction.create({id:id,userId:req.user.id,totalPayment:req.body.totalPayment});   
        req.body.dataBook.forEach(e => Purchase.create({TransactionId:rslt.id,BookId:e}) );
     


        let snap = new midtransClient.Snap({
          isProduction: false,
          serverKey: process.env.MIDTRANS_SERVER_KEY,
        });
    
        let parameter = {
          transaction_details: {
            order_id: rslt.id,
            gross_amount: rslt.totalPayment,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            full_name: buyer.fullName,
            email: buyer.email,
            phone: buyer.phone,
          },
        };
    
        

        const payment = await snap.createTransaction(parameter);

        return res.json({
          status: "success",
          data: {
            transaction: {
             id:rslt.id,
             idBuyer:rslt.userId,
             status:rslt.status,
             payment
            },
          },
        });


    } catch (err) {
      console.log("function insert err =>", err);
      return res.json({
        status: "error",
        message: "server err",
      });
    }
  }

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY
})
  

async function notification (req,res) {
  try {

    const statusResponse = await core.transaction.notification(req.body)
    console.log(statusResponse);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status
    const fraudStatus = statusResponse.fraud_status
    const bank = statusResponse.bank

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        updateTransaction("Pending", bank,orderId);
        res.status(200);
      } else if (fraudStatus == "accept") {
        updateTransaction("Approve",bank,orderId);
        res.status(200);
      }
    } else if (transactionStatus == "settlement") {
      updateTransaction("Approve",bank,orderId);
      res.status(200);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      updateTransaction("Cancel",bank,orderId);
      res.status(200);
    } else if (transactionStatus == "pending") {
     
      updateTransaction("Pending",bank,orderId);
      res.status(200);
    }

    
  } catch (error) {
    console.log(error)
    res.send({
      message: 'Server Error'
    })
  }
}


const updateTransaction = async (status, attachment, transactionId) => {

  await Transaction.update(
    {
      status,
      attachment
    },
    {
      where: {
        id: transactionId,
      },
    }
  );

  if(status === "Approve"){
    const transaction = await Transaction.findOne({where:{id:transactionId} ,include:[{model:Purchase}]});
    const iduser= transaction.userId;
    const book = transaction.Purchases;
    
    book.forEach(e => PurchasesBook.create({UserId:iduser,BookId:e.BookId}) );
  }

}; 

     
  module.exports={getAll,insert,notification};