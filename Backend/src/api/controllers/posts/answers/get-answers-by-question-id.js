import { Answer } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';

export default async (req, res) => {
  let questionId = req.params.questionId;
   let answers  = await Answer.find({questionId: questionId, isActive: true}).
   populate({
    path: 'createdBy',
    select: '_id email firstName lastName'
   })
   .catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });;
  
  return res.status(200).json({
    resultMessage: { en: getText('en', '00112'), },
    resultCode: '00112', answers
  });
};