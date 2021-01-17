const express=require('express')
const router=express.Router()
const Question=require('../models/Question')
const Answers=require('../models/Answers')
const submissionhandler= async (req,res,next)=>{
    try{
           let totalScore=0;
           const {email}=req.body;
           console.log(email);
        const {answer}=req.body;
         answer.forEach(async element => 
            {
             
             const _id=element.Question_Id;
             const question=await Question.findOne({_id});
             const correct=question.correctValue;
             if(element.valueChosen===correct)
             {
                 totalScore=totalScore+question.score;
             }
         });
         let Participant=await Answers.create({
             email,
             totalScore
         });
         return res.status(200).json({"Status":"Quiz Submitted Successfully"});
    }
    catch(error)
     { console.log(error);
      return res.status(400).json({"error":error});
    } 
}
module.exports={
    submissionhandler
}