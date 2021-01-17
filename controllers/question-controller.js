const Question=require('../models/Question')
let testquestions=[];
const noofquestions=1;

const getshuffledpertest=async (req,res,next)=>{

    try{
        const questions=await Question.find();
        console.log(questions);
        shuffle(questions);
        
        function shuffle(array) {
         for (let i = array.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
             [array[i], array[j]] = [array[j], array[i]];
         }
         //console.log("------------------------------------------------------------------------")
         //console.log(array[0]);
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
        //   let {email}=req.body
        //   console.log(email);
        //   let currentuser=await registeredUsers.findOne({email})
         //   console.log(currentuser);
     
       const questions=await Question.find();
       return res.status(200).json(questions);
        
    }
    catch(error)
    {
        return res.status(500).json({"error":error})
    }}

const getquestionbyid=async (req,res,next)=>{
    try {
        //     const _id = req.params.id 
        //     let {email}=req.body
        //   let currentuser=await registeredUsers.findOne({email})
            const questions = await Question.findOne({_id})        
            if(!questions){
                return res.status(404).json({})
            }else{
                return res.status(200).json(questions)
            }
    
        } catch (error) {
            return res.status(500).json({"error":error})
        }
}
const createquestion=async (req,res,next)=>{
    try {
        const { id }=req.body
        const { question } = req.body
        const { image } = req.body
        const { options } = req.body
        const {correctValue}=req.body
        const {score}=req.body

        const questions = await Question.create({
            id,
            question,
            image,
            options,
            correctValue,
            score
        })

        return res.status(201).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
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
        const _id = req.params.id 

        const questions = await Question.deleteOne({_id})

        if(questions.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
module.exports={
    getshuffledpertest,
    getallquestions,
    getquestionbyid,
    createquestion,
    updatequestion,
    deletequestion
}