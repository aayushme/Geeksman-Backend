const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  question: {
    type:String,
    default:null
  },
  image:{
    type: String,
    default:null
  },
  options:[
    {
      option:{
        type:String,
        required: true,
        default:null
      },
      value: {
        type: String,
        required: true,
        default:null
      },
    },
  ],
  correctvalue:{
   type:String,
   required:true,
   default:null
  },
  score:{
    type:String,
    required:true,
    default:null
  }
});
module.exports = mongoose.model("Question", QuestionSchema);
