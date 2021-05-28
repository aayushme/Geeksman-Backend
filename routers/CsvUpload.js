const express=require('express')
const controller=require("../controllers/fileupload-controller")
const {upload}=require('../MulterEngine/MulterEngine-manager')
const router=express.Router()
const middleware=require('../middleware/check-auth')
//Only authorized users can upload the file
router.post('/uploadfile',middleware,upload.single("myImage"),controller.fileuploadcontroller)
module.exports=router