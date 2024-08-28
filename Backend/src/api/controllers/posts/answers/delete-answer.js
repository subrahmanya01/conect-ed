import { Answer } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';

export default async (req, res) => {

   let answerId = req.params.id;

   let answerExist  = await Answer.exists({_id: answerId}).catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  if(!answerExist)
  {
    return res.status(404).json(errorHelper('00110', req, getText('00110')));
  }

  let answer = await Answer.findById(answerId).catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  answer.isActive = false;
  answer.deletedAt = new Date();

  await answer.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });
  
  return res.status(200).json({
    resultMessage: { en: getText('en', '00111'), },
    resultCode: '00111'
  });
};