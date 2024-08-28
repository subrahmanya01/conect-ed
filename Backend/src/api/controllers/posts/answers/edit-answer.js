import { Answer } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';
import { validateEditAnswerRequest} from '../../../validators/answer.validator.js'
export default async (req, res) => {
  try
  {
    const { error } = validateEditAnswerRequest(req.body);

    if (error) {
     let code = '00100';
     if (error.details[0].message.includes('content'))
       code = '00102';
      if (error.details[0].message.includes('_id'))
       code = '00102';
     return res.status(400).json(errorHelper(code, req, error.details[0].message));
   }

   let answer = await Answer.findById(req.body._id).catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  if(!answer || !answer.isActive)
  {
    return res.status(304).json(errorHelper('00110', req, getText("00110")));
  }

  answer.content = req.body.content;
  answer.isEdited = true;
  answer.tags = req.body.tags;

  answer = await answer.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });
 
   return res.status(200).json({
     resultMessage: { en: getText('en', '00113'), },
     resultCode: '00113', answer
   });
  }
  catch(err)
  {
    console.log(err.message)
  }
};