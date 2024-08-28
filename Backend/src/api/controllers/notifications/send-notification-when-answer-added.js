import { Answer, Friend, Notification, Question, User } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {
    let userId = req.params.userId;
    let answerId =  req.params.answerId;

    console.log("answers")

    let followers = await Friend.find({followingTo: userId, isActive:true}).select("followedBy").catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });

    let answer = await Answer.findOne({_id: answerId}).catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });

    let question =  await Question.findOne({_id:answer.questionId, isActive: true}).catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });
    
    let questionTags = question.tags;
    let answerTags = answer.tags;

    let uniqueTags = new Set();
    questionTags.forEach(tag=>{
        uniqueTags.add(tag);
    })

    answerTags.forEach(tag=>{
        uniqueTags.add(tag);
    })

    let userIds = await User.find({tags: { $in: Array.from(uniqueTags) }}).select("_id").catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });

    let answerAddedUsers = await Answer.find({questionId:question._id, isActive: true}).select("createdBy").catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });
    
    let uniqueUsers = new Set();

    followers.forEach(user => {
        uniqueUsers.add(user.followedBy);
    });

    userIds.forEach(user => {
        uniqueUsers.add(user._id);
    });

    answerAddedUsers.forEach(user => {
        uniqueUsers.add(user.createdBy);
    });

    let uniqUserIds =  Array.from(uniqueUsers);
    
    return res.status(200).json({
      resultMessage: { en: getText("en", "00138") },
      resultCode: "00138",
      uniqUserIds
    });
  } catch (err) {
    console.log(err.message);
  }
};
