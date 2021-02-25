const mongoose = require("mongoose");
const mongoosevalidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default:null
  },
  email: {
    type: String,
    required: true,
  unique: true,
  },
  phoneno:{
    type: Number,
    default:null
  },
  college:{
    type: String,
    default:null
  },
  year:{
    type: String,
    default:null,
  },
  Branch:{
    type: String,
    default:null
  },
  password:{
    type: String,
    required: true,
  },
  profilePhotoLocation:{
    type: String,
    default:null
  },
  usercontestdetail:[
    {
      type:mongoose.Types.ObjectId,
      ref:'RegisteredUser'
    }
  ],
  usereventdetail:[
    {
      type:mongoose.Types.ObjectId,
      ref:'FestEventRegisteredUser'
    }
  ]
});
userSchema.plugin(mongoosevalidator);
module.exports = mongoose.model("User", userSchema);