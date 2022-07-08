const jwt= require('jsonwebtoken');

function authenticateToken(){
 return (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return  res.json({status:"error",message:"error token  not exist"})
    
    jwt.verify(token,process.env.JWT_SECRET_KEY, (err, user) => {
 
      console.log(err);
      
      if (err) return res.json({status:"error",message:"error on token"})
      req.user = user
      
      next()
    })
  }
}
  
  module.exports=authenticateToken;