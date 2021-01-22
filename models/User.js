const mongoose = require("mongoose");
const mongoosevalidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  unique: true,
  },
  phoneno:{
    type: Number,
  },
  college:{
    type: String,
  },
  year:{
    type: String,
  },
  Branch:{
    type: String,
  },
  password:{
    type: String,
    required: true,
  },
  image:{
    type: String,
  },
  usercontestdetail:[
    {
      type:mongoose.Types.ObjectId,
      ref:'RegisteredUser'
    }
  ],
  isLogin:{
      type:Boolean,
      default:false
  }
});
userSchema.plugin(mongoosevalidator);
module.exports = mongoose.model("User", userSchema);