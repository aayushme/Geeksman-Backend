const express=require('express')
const controller=require("../controllers/fileupload-controller")
const {upload}=require('../File-Upload/File-upload-manager')
const router=express.Router()
router.post('/uploadfile', upload.single("uploadfile"),controller.fileuploadcontroller)
module.exports=router