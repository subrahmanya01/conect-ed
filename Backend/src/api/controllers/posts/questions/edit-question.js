import { Question } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';
import { validateEditQuestionRequest } from '../../../validators/question.validator.js';
export default async (req, res) => {
  try
  {
       
    const { error } = validateEditQuestionRequest(req.body)

    if (error) {
      let code = '00100';
      if (error.details[0].message.includes('title'))
        code = '00101';
      else if (error.details[0].message.includes('content'))
        code = '00102';
      else if (error.details[0].message.includes('_id'))
        code = '00107';
      return res.status(400).json(errorHelper(code, req, error.details[0].message));
    }
    console.log(req.body._id);
    let question  = await Question.findById(req.body._id).catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    if(!question || !question.isActive)
    {
      return res.status(404).json(errorHelper('00115', req, getText("00115")));
    }

    let requestBody = req.body;
    if(requestBody.content) question.content = requestBody.content;
    if(requestBody.title) question.title = requestBody.title;
    if(requestBody.tags) question.tags = requestBody.tags;


    question.isEdited = true;


    question = await question.save().catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    return res.status(200).json({
      resultMessage: { en: getText('en', '00108'), tr: getText('tr', '00108') },
      resultCode: '00108', question
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};