import { Answer, Question, User } from "../../../models//index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {
    let keyword = req.params.keyword;
    console.log(keyword);

    //Check keyword mathes with any user names
    let userIds = await User.find(
      {
        firstName: new RegExp(keyword, "i"),
        lastName: new RegExp(keyword, "i"),
      },
      { _id: 1 }
    ).catch((err) => {
      return res.status(500).json(errorHelper("00034", req, err.message));
    });
    console.log(userIds);

    let questionIds = await Answer.find(
      { content: new RegExp(keyword, "i") },
      { questionId: 1 }
    ).catch((err) => {
      return res.status(500).json(errorHelper("00034", req, err.message));
    });
    console.log(questionIds);

    let questions = await Question.find({
      $or: [
        { _id: { $in: questionIds } },
        { title: new RegExp(keyword, "i") },
        { content: new RegExp(keyword, "i") },
        { createdBy: { $in: userIds } },
        { tags: { $in: keyword } }
      ],
    })
    .catch((err) => {
      return res.status(500).json(errorHelper("00034", req, err.message));
    });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00105") },
      resultCode: "00105",
      questions,
    });
  } catch (err) {
    console.log(err.message);
  }
};
