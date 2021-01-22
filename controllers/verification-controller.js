const PendingUser=require('../models/PendingUser')
const User=require('../models/User') 
const verificationhandler=async (req,res,next)=>{
    var hash=req.params.hash
    try{
      const user=await PendingUser.find({_id:hash})
      const {name,email,password}=user[0]
      if(!user){
        return res.status(422).send('User cannot be activated')
      }
      let newuser=new User({
        name,
        email,
        password
      })
      try{
        await newuser.save()
        await user[0].remove()
      }catch(e){
        res.json({error:e})
      }
      res.render('verification',{name})
    }catch(e){
      res.json({message:'Could not verify you please try again later'})
    }
}
module.exports={
    verificationhandler
}