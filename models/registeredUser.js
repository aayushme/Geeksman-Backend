const mongoose=require('mongoose')
const registerSchema=new mongoose.Schema({
            Name:{
                type:String,
                
            },
            email:{
                type:String,
                
            },
            PhoneNo:{
                type:Number,
                
            },
            branch:{
                type:String
            },
            college:{
                type:String
            },
            year:{
                type:String
            },
            Branch:{
                type:String,
            },
            slot:{
                slotno:{
                    type:Number
                },
                slottime:{
                    type:Date
                }
            },
            marks:{
                type:Number,
                default:0
            },
            contestname:{
                type:String,
            },
            ContestId:{
                type:String,
                
            },
            
})
module.exports=mongoose.model("RegisteredUser",registerSchema);