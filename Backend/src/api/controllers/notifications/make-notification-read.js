import { Notification } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {
   let notificationId = req.params.id; 
   let notificatuion= await Notification.findOne({_id: notificationId}).catch((err)=>{
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  notificatuion.isRead = true;

  await notificatuion.save().catch((err)=>{
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00138") },
      resultCode: "00138",
      notificatuion
    });
  } catch (err) {
    console.log(err.message);
  }
};
