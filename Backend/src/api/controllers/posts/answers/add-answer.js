import { Answer, Question, User } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';
import { validateCreateAnswerRequest } from '../../../validators/answer.validator.js';
export default async (req, res) => {
  const { error } = validateCreateAnswerRequest(req.body);

  console.log(error);

  if (error) {
    let code = '00100';
    if (error.details[0].message.includes('questionId'))
      code = '00107';
    else if (error.details[0].message.includes('content'))
      code = '00102';
    else if (error.details[0].message.includes('createdBy'))
      code = '00103';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }

  let userIdExist =  User.exists({_id:req.body.createdBy}).catch((err)=>{
    return res.status(500).json(errorHelper('00031', req, err.message));
  });
  if(!userIdExist)
  {
    return res.status(304).json(errorHelper("00100", req, getText('en', '00104') ))
  }

  let questionExist =  Question.exists({_id:req.body.questionId}).catch((err)=>{
    return res.status(500).json(errorHelper('00031', req, err.message));
  });
  if(!questionExist)
  {
    return res.status(304).json(errorHelper("00106", req, getText('en', '00106') ))
  }
  console.log(req.body.tags);
  let answer = new Answer({
    content: req.body.content,
    createdBy : req.body.createdBy,
    questionId: req.body.questionId,
    tags: req.body.tags
  })

  answer = await answer.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText('en', '00109'), tr: getText('tr', '00109') },
    resultCode: '00109', answer
  });
};