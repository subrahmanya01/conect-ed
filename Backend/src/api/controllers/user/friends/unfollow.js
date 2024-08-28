import { Friend, User } from '../../../../models/index.js';
import { errorHelper, logger, getText } from '../../../../utils/index.js';
import { validateFollowUnFollowRequest} from '../../../validators/friends.validator.js';

export default async (req, res) => {
  try
  {

    const { error } = validateFollowUnFollowRequest(req.body);

    if (error) {
      let code = '00100';
      const message = error.details[0].message;
      if (message.includes('followingTo'))
        code = '00118';
      else if (message.includes('followedBy'))
        code = '00117';
      return res.status(400).json(errorHelper(code, req, message));
    }

    let followedByUserExist = await User.exists({_id: req.body.followedBy}).catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });

    if(!followedByUserExist)
    {
      return res.status(400).json(errorHelper("00123", req, getText("00123")));
    }

    let followingToUserExist = await User.exists({_id: req.body.followedBy}).catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });
    if(!followingToUserExist)
    {
      return res.status(400).json(errorHelper("00124", req, getText("00124")));
    }
    
    let isUserFollowing = await Friend.exists({followedBy: req.body.followedBy, followingTo : req.body.followingTo, isActive: true}).catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });

    if(!isUserFollowing)
    {
      return res.status(400).json(errorHelper("00122", req, getText("00122")));
    }

    let friend = await Friend.find({followedBy: req.body.followedBy, followingTo : req.body.followingTo}).catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });

    friend[0].isActive = false;

    await friend[0].save().catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });

    return res.status(200).json({
      resultMessage: { en: getText('en', '00121'), tr: getText('tr', '00121') },
      resultCode: '00121',friend 
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};