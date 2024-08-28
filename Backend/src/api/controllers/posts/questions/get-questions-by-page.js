import { Question } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';

export default async (req, res) => {

   let pageNumber = req.params.page;
   let pageSize = req.params.pageSize;
   const skip = (pageNumber - 1) * pageSize ;
   
   let questions  = await Question.find({isActive: true}).skip(skip).limit(pageSize).populate({
    path: 'createdBy',
    select: '_id email firstName lastName'
   }).catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });;
  
  return res.status(200).json({
    resultMessage: { en: getText('en', '00105'), },
    resultCode: '00105', questions
  });
};