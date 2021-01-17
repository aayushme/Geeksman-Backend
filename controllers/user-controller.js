const {validationResult}=require('express-validator')
const User=require('../models/User.js')
const HttpError=require('../models/Http-error')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const signuphandler=async (req,res,next)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return next(new HttpError("Invalid inputs passed,please check your data",422))
}
const {name,email,password}=req.body
let existinguser;
try{
existinguser=await User.findOne({email})
}catch(err){
const error=new HttpError('Signup failed,please try again later',500)
return next(error)
}
if(existinguser){
    const error=new HttpError('User already exists,Please login instead',422)
    return next(error)
}
let hashedpassword;
try{
hashedpassword=await bcrypt.hash(password,8)
}catch(err){
    const error = new HttpError("Could not create user,try again later", 500);
    return next(error);
}
const newuser = new User({
    name,
    email,
    password: hashedpassword,
  });
try{
    await newuser.save();
}catch(err){
    const error = new HttpError(
        "Signing up failed,please try again later",
        500
      );
      return next(error);
}

let token;
try{
    token = jwt.sign(
        { userdId: newuser.id, email: newuser.email },
        process.env.JWT_KEY,
        { expiresIn: "7h" }
      );
}catch(err){
    const error=new HttpError( "Signing up failed,please try again later",
    500)
    return next(err)
}
newuser.isLogin=true;
await newUser.save();
}
const loginhandler=async (req,res,next)=>{

    const { email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
      existingUser.isLogin=true;
      await existingUser.save();
      return res.status(200).json(existingUser);
    } catch (err) {
      const error = new HttpError("Logging in failed,please try later", 500);
      return next(error);
    }
    if (!existingUser) {
      const error = new HttpError(
        "Invalid credentials,could not log you in",
        401
      );
      return next(error);
    }
    let isvalidpasword = false;
    try {
      isvalidpasword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError(
        "could not log you in, please check your credentials and try again",
        500
      );
      return next(error);
    }
    if (!isvalidpasword) {
      const error = new HttpError(
        "could not log you in, please check your credentials and try again",
        500
      );
      return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        { userdId: existingUser.id, email: existingUser.email },
        process.env.JWT_KEY,
        { expiresIn: "7h" }
      );
    } catch (err) {
      const error = new HttpError(
        "Logging in failed,please try again later",
        500
      );
      return next(error);
    }
    existingUser.isLogin=true;
    await existingUser.save();
    res
      .status(201)
      .json({
       userid:existingUser.id,
       email:existingUser.email,
       username:existingUser.name,
       token
      });
}
const updateuser=async (req,res,next)=>{
const userid=req.params.uid
const {name,year,phoneno,college,Branch}=req.body
let user;
try{
user=await User.findById(userid)
}catch(err){
    return next(new HttpError('Something went wrong please try again later',500))
}
if(!user){
    return next(new HttpError('Could not find a user with that id,please try again later',404))
}
user.name=name
user.year=year
user.phoneno=phoneno
user.college=college
user.Branch=Branch
try{
await user.save()
}catch(err){
    return next(new HttpError('Could not update the user,please try again later',500))
}
res.status(200).json({user:user.toObject({getters:true})})
}
const getuserbyid=async (req,res,next)=>{
   const userid=req.params.uid
   let user;
   try{
     user=await User.findById({userid})
   }catch(err){
       const error=new HttpError('Something went wrong could not fetch user please try again later',500)
       return next(error)
    }

   if(!user){
      const error=new HttpError('Could not find a user with that id',404)
   }
   res.status(200).json({ user: user.toObject({ getters: true }) });
}
const deleteuser=async (req,res,next)=>{
const userid=req.params.uid
let user;
try{
user=await User.findById(userid)
}catch(err){
const error=new HttpError('could not delete the user,please try again later',500)
return next(error)
}
if(!user){
    return next(new HttpError('Could not find a user with that id',404))
}
try{
 await user.remove()
}catch(err){
    return next(new HttpError('Could not delete the user,please try again later',500))
}
res.status(200).json({message:'User deleted'})
}
const getallusers=async (req,res,next)=>{
    let users;
    try{
      users=await User.find({})
    }catch(err){
        const error=new HttpError('could not fetch users,please try again later',500)
        return next(error)
    }
    if(!users){
        return next(new HttpError('Could not find users,please try again later',404))
    }
    res.status(200).json({users:users.map(user=>user.toObject({getters:true}))})
}
module.exports={
    signuphandler,
    loginhandler,
    updateuser,
    getuserbyid,
    getallusers,
    deleteuser
}