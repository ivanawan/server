const multer = require('multer');

exports.uploadFile = (File) => {
  
  // Destination and rename
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function(req, file, cb){
      cb(null, Date.now() + '-'+ file.originalname.replace(/\s/g,""));
    }
  })

  


 const upload = multer({
    storage
  }).fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'bookAttachment', maxCount: 1 }])


  return (req, res, next) => {
    upload(req, res, function (err) {

      // Filter
      if(req.fileValidationError){
        return res.send(req.fileValidationError)
      }
      
      // If file empty
      // if(!req.file && !err){
      //   return res.send({
      //     message: 'Please select files to upload!'
      //   })
      // }

      console.log(req.body,req.files);

      // Limit
      if(err){
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.send({
            message: 'Max file sized 10Mb'
          })
        }
        return res.send(err)
      }

      return next();
    })
  }
};