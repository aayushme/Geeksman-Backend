const mongoose=require('mongoose')
const mongooseValidator=require('mongoose-unique-validator')
const AdminSchema=new mongoose.Schema({
   adminname:{
     type:String,
     required:true
   },
   adminemail:{
     type:String,
     required:true,
     unique:true
   },
   adminPassword:{
     type:String,
     required:true,
   },


})
AdminSchema.plugin(mongooseValidator)
module.exports=mongoose.model('Admin',AdminSchema)