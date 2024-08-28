import { Friend, User } from '../../../../models/index.js';
import { errorHelper, logger, getText } from '../../../../utils/index.js';

export default async (req, res) => {
  try
  {
    let userId = req.params.id;

    let isUserExist = await User.exists({_id: userId}).catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });

    if(!isUserExist)
    {
      return res.status(400).json(errorHelper("00126", req, getText("00126")));
    }

    let friends = await Friend.find({followedBy: userId, isActive:true}).populate('followingTo').catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });

    return res.status(200).json({
      resultMessage: { en: getText('en', '00125'), tr: getText('tr', '00125') },
      resultCode: '00125',friends 
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};