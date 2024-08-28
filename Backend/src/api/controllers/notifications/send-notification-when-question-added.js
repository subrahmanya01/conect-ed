import { Friend, Notification, Question, User } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {

    console.error("Hey i came");
    let userId = req.params.userId;
    let questionId =  req.params.questionId;

    let followers = await Friend.find({followingTo: userId, isActive:true}).select("followedBy").catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });

    let question =  await Question.findOne({_id:questionId, isActive: true}).catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });
    
    let tagList = question.tags;

    let userIds = await User.find({tags: { $in: tagList }}).select("_id").catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });
    
    let uniqueUsers = new Set();

    followers.forEach(user => {
        uniqueUsers.add(user.followedBy);
    });

    userIds.forEach(user => {
        uniqueUsers.add(user._id);
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
