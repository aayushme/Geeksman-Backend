const Question = require("../models/Question");
const User=require('../models/User')
const submissionhandler = async (req, res, next) => {
  try {
    let totalScore = 0;
    const token = req.headers.authorization.split(" ")[1]; //authorization 'Bearer token'
    if (!token) {
      return res
        .status(404)
        .json({ message: "Test time is over, you are late" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (!decodedToken) {
      return res
        .status(404)
        .json({ message: "Test time is over, you are late!!" });
    }
    const contestid = decodedToken.contestId;
    const uid=decodedToken.userId
    const { answer } = req.body;
    let contestuser=await User.findById(uid).populate('usercontestdetail')
    if(!contestuser||contestuser.usercontestdetail.length===0){
        return res.status(404).json({message:'Could not find you as a registered candidate'})
    }
    const user=contestuser.usercontestdetail.find((user)=>user.ContestId===contestid)
    if(!user){
        return res.status(404).json({message:'Could not find you as a registered candidate'})
    }
    const questions = await Question.find({ contestid });
    answer.forEach(async (element) => {
      let question = questions.find(
        (question) => question._id === element.Question_Id
      );
      if (element.optionchosen === question.correctvalue) {
        totalScore = totalScore + question.score;
      }
    });
    user.marks = totalScore;
    await user.save();
    return res.status(200).json({ Status: "Quiz Submitted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
module.exports = {
  submissionhandler,
};
