import { User } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {
    let userIdList = req.body.ids;

    const users = await User.find({ _id: { $in: userIdList } }).catch((err) => {
      return res.status(500).json(errorHelper("00088", req, err.message));
    });

    let userListReturning = [];
    let notExistingUser = [];

    if(users)
    {
      users.forEach((user) => {
        userListReturning.push(user._id.toString());
      });
      userIdList.forEach((user) => {
        if (!userListReturning.includes(user)) notExistingUser.push(user);
      });
    }

    return res.status(200).json({
      resultMessage: { en: getText("en", "00127"), tr: getText("tr", "00127") },
      resultCode: "00127",
      users,
      notExistingUsers: notExistingUser,
    });
  } catch (err) {
    console.log(err.message);
  }
};
