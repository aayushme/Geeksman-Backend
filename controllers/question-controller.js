const Question=require('../models/Question')
const Contest =require('../models/Contest')
const jwt=require('jsonwebtoken')
const {cloudinary}=require('../Cloudinaryconfig/Cloudinary')
const mongoose=require('mongoose')

const getshuffledpertest=async (req,res,next)=>{
    let testquestions=[];
    let noofquestions;
    const token = req.headers.authorization.split(" ")[1]; //authorization 'Bearer token'
    if (!token) {
      return res.status(404).json({message:'Could not start your test!!'})
    }
    const decodedToken = jwt.verify(token,process.env.JWT_KEY);
    const contestId=decodedToken.contestId
    let contest;
    try{
        contest=await Contest.findById(contestId)
    }catch(e){
        return res.json({message:'Could not find the contest!!'})
    }
    if(contest){
      noofquestions=contest.questions
    }else{
        return res.json({message:'Contest does not exists'})
    }
    try{
        const questions=await Question.find({contestid:contestId},'-correctvalue');
        shuffle(questions);        
        function shuffle(array) {
         for (let i = array.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
             [array[i], array[j]] = [array[j], array[i]];
         }
         //console.log("------------------------------------------------------------------------")
         for(let i=0;i<noofquestions;i++)
        {
            testquestions.push(array[i]); 
        }
        return res.status(200).json(testquestions);
     }
     }
     catch(error)
     {  //console.log(error);
         return res.status(500).json({"error":error})
     }
     }
const getallquestions=async (req,res,next)=>{
    try{
       const questions=await Question.find({});
       return res.status(200).json(questions);   
    }
    catch(error)
    {
        return res.status(500).json({"error":error})
    }}
const getquestionbyid=async (req,res,next)=>{
    try {
            const questionid=req.params.id
            const question = await Question.findById(questionid)        
            if(!question){
                return res.status(404).json({message:'No question found with that id'})
            }else{
                return res.status(200).json(questions)
            }
        } catch (error) {
            return res.status(500).json({"error":error})
        }
}


//Create questions handler
const createquestion=async (req,res,next)=>{
    const contestid=req.params.cid
    let contest;
    try{
       contest=await Contest.findById(contestid)
    }catch(e){
        return res.status(404).json({message:e})
    }
    if(!contest){
        return res.status(404).json({message:'There is no contest present'})
    }
    const {question,image,options,correctvalue,score}=req.body

    //First upload image to cloudinary and get url
    let imageresponse;
    // console.log(image)
    try{
        imageresponse=await cloudinary.uploader.upload(image,{upload_preset:'Question-images'})
    }catch(e){
        return res.status(500).json({message:'Image upload failed!!'})
    }
    let questions =new Question({
        question,
        image:imageresponse.secure_url,
        options,
        correctvalue,
        score
    })
    
    // Started a mongoose session and transaction if anything fails changes rolls back
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await questions.save({session:sess})
    contest.questions.push(questions)
    await contest.save({session:sess})
    await sess.commitTransaction();
    return res.status(201).json({message:"Created successfully"})
}

const getcontestquestions=async (req,res,next)=>{
const contestid=req.params.cid
let questionsbycontestid;
try{
questionsbycontestid=await Contest.findById(contestid).populate("questions")
}catch(e){
    return res.status(500).json({message:e})
}
if(!questionsbycontestid||questionsbycontestid.questions.length===0){
    return res.status(404).json({message:"There are no questions"})
}
return res.status(200).json({questions:questionsbycontestid.questions})
}
const updatequestion=async (req,res,next)=>{
    try {
        const _id = req.params.id 
        const { id,question , image ,options,score } = req.body

        let questions = await Question.findOne({_id})

        if(!questions){
            questions = await Question.create({
                id,
                question,
                image,
                options,
                score
            })    
            return res.status(201).json(questions)
        }else{
            questions.id = id
            questions.question=question
            questions.image=image
            questions.options = options
            questions.score= score
            await questions.save()
            return res.status(200).json(questions)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({"error":error})
    }
}

const deletequestion=async (req,res,next)=>{
    try {
       const questionid=req.params.id
       const question=await Question.findById(questionid)
       if(!question){
           return res.status(404).json({message:'Could not find a question with that id'})
       }
       try{
       await question.remove()
       res.status(200).json({message:'question deleted successfully'})
       }catch(e){
          return res.status(500).json({error:e})
       }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
module.exports={
    getcontestquestions,
    getshuffledpertest,
    getallquestions,
    getquestionbyid,
    createquestion,
    updatequestion,
    deletequestion
}