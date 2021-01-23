const Question=require('../models/Question')
const Answers=require('../models/Answers')
const submissionhandler= async (req,res,next)=>{
    try{
        let totalScore=0;
        const {email}=req.body
     const {answer}=req.body;
      answer.forEach(async element => 
         {
          if(element.valueChosen===element.correctValue)
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