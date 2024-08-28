import { Notification } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";
import { validateNewNotification } from "../../validators/notification.validator.js";

export default async (req, res) => {
  try {
    const { error } = validateNewNotification(req.body);

    if (error) {
        let code = '00100';
        if (error.details[0].message.includes('userId'))
        code = '00007';
        else if (error.details[0].message.includes('message'))
        code = '00131';
        return res.status(400).json(errorHelper(code, req, error.details[0].message));
    }

    let notification = new Notification({
        userId: req.body.userId,
        message: req.body.message,
        link: req.body?.link?? "",
        isRead: req.body?.isRead?? false
    })

    notification = await notification.save().catch((err)=>{
        return res.status(500).json(errorHelper('00031', req, err.message));
      });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00136") },
      resultCode: "00136",
      notification
    });
  } catch (err) {
    console.log(err.message);
  }
};
