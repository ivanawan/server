const jwt= require('jsonwebtoken');

function isadmin(){
 return (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.json({status:"error",message:"error token  not exist"})
    
    jwt.verify(token,process.env.JWT_SECRET_KEY, (err, user) => {
      console.log(err)
  
      if (err) return res.json({status:"error",message:"error on token"})
      // console.log(user);
      if(user.status !== "ADMIN") return res.json({status:"error",message:" your not admin"})

      req.user = user
      
      next()
    })
  }
}
  
  module.exports=isadmin;