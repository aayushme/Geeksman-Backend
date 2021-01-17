const mongoose=require('mongoose')
const QuestionSchema=new mongoose.Schema({
    id:String,
    question:String,
    image:{
        type:String,
        required:false
    },
    options:[
        {
        option:{
            type:String,
            required:true
        },
        value:{
            type:String,
            required:true,
        }
    }
    ],
    correctValue:String,
    score:Number,
    email:String
})
module.exports=mongoose.model('Question',QuestionSchema);