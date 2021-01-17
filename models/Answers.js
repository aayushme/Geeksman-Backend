const mongoose=require('mongoose')
const AnswerSchema=new mongoose.Schema({
    email:{type:String},
    answer:[
        {
            Question_Id:{
                type:String,
                required:true
            },
            valueChosen:{
                type:String,
                required:true
            }
        }
    ],
    totalscore:{
       type:Number,
       default:0
    }
})
module.exports=mongoose.model('Answers',AnswerSchema);