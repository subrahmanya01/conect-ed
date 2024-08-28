import { Question, User } from "../../../../models/index.js";
import { errorHelper, logger, getText } from "../../../../utils/index.js";
import { validateCreateQuestionRequest } from "../../../validators/question.validator.js";
export default async (req, res) => {
  try {
    const { error } = validateCreateQuestionRequest(req.body);

    if (error) {
      let code = "00100";
      if (error.details[0].message.includes("title")) code = "00101";
      else if (error.details[0].message.includes("content")) code = "00102";
      else if (error.details[0].message.includes("createdBy")) code = "00103";
      return res
        .status(400)
        .json(errorHelper(code, req, error.details[0].message));
    }

    let userIdExist = User.exists({ _id: req.body.createdBy }).catch((err) => {
      return res.status(500).json(errorHelper("00031", req, err.message));
    });

    if (!userIdExist) {
      return res
        .status(304)
        .json(errorHelper("00100", req, getText("en", "00104")));
    }

    let question = new Question({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.body.createdBy,
      tags: req.body.tags,
    });

    question = await question.save().catch((err) => {
      return res.status(500).json(errorHelper("00034", req, err.message));
    });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00128"), tr: getText("tr", "00128") },
      resultCode: "00128",
      question,
    });
  } catch (err) {
    console.log(err);
  }
};
