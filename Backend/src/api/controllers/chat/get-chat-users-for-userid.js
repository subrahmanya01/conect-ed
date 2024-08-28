import { Chat, User } from '../../../models/index.js';
import { errorHelper, logger, getText} from '../../../utils/index.js';
export default async (req, res) => {
  try
  {
   
    let userIdExist =  User.exists({_id:req.params.id}).catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    if(!userIdExist)
    {
        return res.status(400).json(errorHelper("00132", req, getText("00132")));
    }
    let result = await Chat.find(
        {
            $or: [
                { from: req.params.id },
                { to:  req.params.id },
            ]
        }
    ).select("from to createdAt").catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });

    const distinctUserCollection = new Set();

    result.reverse().forEach(element => {
        if(element.from==req.params.id)
        {   
            distinctUserCollection.add(element.to.toString());
        }
        else
        {
            distinctUserCollection.add(element.from.toString());
        }
    });

    console.log(distinctUserCollection);

    let users = await User.find({ '_id': { $in: Array.from(distinctUserCollection) } }).catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });

      const orderMap = {};
      Array.from(distinctUserCollection).forEach((id, index) => {
          orderMap[id] = index;
      });
      
      users.sort((a, b) => {
          return orderMap[a._id] - orderMap[b._id];
      });
      
    return res.status(200).json({
      resultMessage: { en: getText('en', '00135') },
      resultCode: '00135', users
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};