const Question=require('../models/Question')
const Answers=require('../models/Answers')
const submissionhandler=async (req,res,next)=>{
    try{
        let totalScore=0;
     const {answer}=req.body;
      answer.forEach(async element => 
         {
          
          const _id=element.Question_Id;
          const question=await Question.findOne({_id});
          const options=question.option;
          options.forEach(member=>{
              if(member.isCorrect==true)
              {
                  if(member.text===element.optionChosen)
                  {
                       totalScore=totalScore+element.score;
                  }
                  
              }
          })
          console.log(totalScore);
      });
      return res.status(200).json({"Status":"Quiz Submitted Successfully"});
      //const question=await Question.find();
      //return res.status(200).json(question);
 }
 catch(error)
  { console.log(error);
   return res.status(400).json({"error":error});
 } 
}
module.exports={submissionhandler}