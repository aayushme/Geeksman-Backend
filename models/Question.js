const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  id: String,
  question: String,
  profilePhotoLocation: {
    type: String,
    required: false,
  },
  options:[
    {
      option:{
        type:String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  contestid:{
     type:mongoose.Types.ObjectId,
     ref:'Contest'
  },
  correctvalue:{
   type:String,
   required:true
  },
  score: Number,
});
module.exports = mongoose.model("Question", QuestionSchema);
