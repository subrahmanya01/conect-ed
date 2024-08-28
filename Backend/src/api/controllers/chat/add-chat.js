import { Chat, User } from '../../../models/index.js';
import { errorHelper, logger, getText} from '../../../utils/index.js';
import { validateNewChat } from '../../validators/chat.validator.js';
export default async (req, res) => {
  try
  {
    const { error } = validateNewChat(req.body);

    if (error) {
      let code = '00100';
      if (error.details[0].message.includes('from'))
        code = '00129';
      else if (error.details[0].message.includes('to'))
        code = '00130';
      else if (error.details[0].message.includes('message'))
        code = '00131';
      return res.status(400).json(errorHelper(code, req, error.details[0].message));
    }
  
    let fromUserIdExist =  User.exists({_id:req.body.from}).catch((err)=>{
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

    if(!fromUserIdExist)
    {
        return res.status(400).json(errorHelper("00132", req, getText("00132")));
    }

    let toUserIdExist =  User.exists({_id:req.body.to}).catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });
      
    if(!toUserIdExist)
    {
        return res.status(400).json(errorHelper("00133", req, getText("00133")));
    }
    
    let chat = new Chat({
        from: req.body.from,
        to: req.body.to,
        message: req.body.message
    })

    let chatId = await chat.save().catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });
  
    return res.status(200).json({
      resultMessage: { en: getText('en', '00134') },
      resultCode: '00134', chat
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};