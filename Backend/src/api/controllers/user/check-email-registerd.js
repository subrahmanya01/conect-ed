import { User } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
  try
  {
    const user = await User.find({email: req.params.email}).catch(err => {
      return res.status(500).json(errorHelper('00088', req, err.message));
    });
    console.log(user);
  
    return res.status(200).json({
      resultMessage: { en: getText('en', '00089'), tr: getText('tr', '00089') },
      resultCode: '00089',
      isEmailAlreadyRegistered: user.length>0? true: false
    });
  }
  catch(err)
  {
    console.log(err.message);
  }
};