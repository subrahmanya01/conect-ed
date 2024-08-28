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

    let followedByUserExist = await User.findOne({_id: req.body.followedBy}).catch((err) => {
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
    
    let isUserAlreadyFollowing = await Friend.exists({followedBy: req.body.followedBy, followingTo : req.body.followingTo, isActive: true}).catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });

    if(isUserAlreadyFollowing)
    {
      return res.status(400).json(errorHelper("00119", req, getText("00119")));
    }

    let isUserFollowedEarly = await Friend.exists({followedBy: req.body.followedBy, followingTo : req.body.followingTo, isActive: false}).catch((err) => {
      return res.status(500).json(errorHelper('00082', req, err.message));
    });
    let friend = {};
    if(isUserFollowedEarly)
    {
      friend = await Friend.find({followedBy: req.body.followedBy, followingTo : req.body.followingTo, isActive: false}).catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });
      friend[0].isActive = true;
      await friend[0].save().catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });
    }
    else
    {
       friend = new Friend({
        followedBy: req.body.followedBy,
        followingTo: req.body.followingTo
      });
      await friend.save().catch((err) => {
        return res.status(500).json(errorHelper('00082', req, err.message));
      });
    }


    return res.status(200).json({
      resultMessage: { en: getText('en', '00120'), tr: getText('tr', '00120') },
      resultCode: '00120',friend 
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};