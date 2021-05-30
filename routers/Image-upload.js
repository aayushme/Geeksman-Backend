const express=require('express')
const router=express.Router()
const {cloudinary}=require('../Cloudinaryconfig/Cloudinary')
router.post('/image-upload',async (req,res)=>{
const {image}=req.body;
console.log(image)
try{
const uploadresponse=await cloudinary.uploader.upload(image,{upload_preset:'test-upload'})
console.log(uploadresponse)
return res.status(201).json({message:"Successfull"})
}catch(e){
    return res.status(500).json({message:"code gaya"})
}
})
module.exports=router