const Question=require('../models/Question')
const getallquestions=async (req,res,next)=>{
    try{
        const question=await Question.find();
        return res.status(200).json(question);
     }
     catch(error)
     {
         return res.status(500).json({"error":error})
     }
}
const getquestionbyid=async (req,res,next)=>{
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
const createquestion=async (req,res,next)=>{
    try {
        const { description } = req.body
        const { option } = req.body
        const {score}=req.body

        const question = await Question.create({
            description,
            option,
            score
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
const updatequestion=async (req,res,next)=>{
    try {
        const _id = req.params.id 
        const { description, option,score } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                option,
                score
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.option = option
            question.score= score
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
const deletequestion=async (req,res,next)=>{
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
module.exports={
    getallquestions,
    getquestionbyid,
    createquestion,
    updatequestion,
    deletequestion
}