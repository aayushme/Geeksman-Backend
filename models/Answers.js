const mongoose=require('mongoose')
const AnswerSchema=new mongoose.Schema({
    answer:[
        {
            Question_Id:{
                type:String,
                required:true
            },
            optionChosen:{
                type:String,
                required:true
            },
            score:{
                type:Number
            }
        }
    ]
})
module.exports=mongoose.model('Answers',AnswerSchema);