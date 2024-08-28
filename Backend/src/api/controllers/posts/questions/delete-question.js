import { Answer, Question, User } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';
export default async (req, res) => {
  try{

    let questionId = req.params.id;

    let isQuestionExist = await Question.exists({_id: questionId, isActive: true}).catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    if(!isQuestionExist)
    {
      return res.status(404).json(errorHelper('00115', req, getText("00115")));
    }

    let answers = await Answer.find({questionId: questionId, isActive:true}).catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    let question = await Question.findById(questionId).catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    question.isActive = false;
    question.deletedAt = new Date();
    
    answers.forEach(async(answer) => {
      answer.isActive = false;
      answer.deletedAt = new Date();

      await answer.save().catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });
    });

    question = await question.save().catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    return res.status(200).json({
      resultMessage: { en: getText('en', '00116') },
      resultCode: '00116', question
    });
  }
  catch(err)
  {
    console.log(err);
  }
};