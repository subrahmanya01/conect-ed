import { Notification } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {
   let id = req.params.id;
   let notificatuions = await Notification.find({userId: id}).catch((err)=>{
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00137") },
      resultCode: "00137",
      notificatuions
    });
  } catch (err) {
    console.log(err.message);
  }
};
