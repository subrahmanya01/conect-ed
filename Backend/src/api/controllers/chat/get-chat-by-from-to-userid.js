import { Chat, User } from '../../../models/index.js';
import { errorHelper, logger, getText} from '../../../utils/index.js';
export default async (req, res) => {
  try
  {
   
    let fromUserIdExist =  User.exists({_id:req.params.from}).catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    if(!fromUserIdExist)
    {
        return res.status(400).json(errorHelper("00132", req, getText("00132")));
    }

    let toUserIdExist =  User.exists({_id:req.params.to}).catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });

    if(!toUserIdExist)
    {
        return res.status(400).json(errorHelper("00133", req, getText("00133")));
    }
    
    let chats = await Chat.find(
        {
            $or: [
                { from: req.params.from, to:  req.params.to  },
                { from:  req.params.to, to: req.params.from }
            ]
        }
    ).catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });
  
    return res.status(200).json({
      resultMessage: { en: getText('en', '00135') },
      resultCode: '00135', chats
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};