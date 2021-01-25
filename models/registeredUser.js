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
                default:null
            },
            slot:{
                slotno:{
                    type:Number
                },
                slotstarttime:{
                    type:Date
                },
                slotendtime:{
                    type:Date
                }
            },
            marks:{
                type:Number,
                default:0
            },
            contestname:{
                type:String,
                default:null
            },
            testgiven:{
                type:Boolean,
                default:false,
            },
            ContestId:{
                type:String,
                default:null
            },
            
})
module.exports=mongoose.model("RegisteredUser",registerSchema);