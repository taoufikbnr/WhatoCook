const multer = require("multer")
const path = require("path");


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./client/public/images/')

    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+path.extname(file.originalname))

    }

  })
  const fileFilter=(req,file,cb)=>{
  const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null,true);}
    else{

      cb(null,false)
    }
  
}
exports.upload = multer({storage,fileFilter}).single("photo")