import { User, Token } from '../../../models/index.js';
import { generateRandomCode, errorHelper, getText, logger } from '../../../utils/index.js';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  await User.updateOne({ _id: req.user._id }, {
    $set: {
      isActivated: false, deletedAt: Date.now()
    }
  }).catch(err => {
    return res.status(500).json(errorHelper('00090', req, err.message));
  });

  await Token.deleteOne({ userId: req.user._id }).catch(err => {
    return res.status(500).json(errorHelper('00091', req, err.message));
  });

  logger('00092', req.user._id, getText('en', '00092'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00092'), tr: getText('tr', '00092') },
    resultCode: '00092'
  });
};

/**
 * @swagger
 * /user:
 *    delete:
 *      summary: Delete the User
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Your account was deleted successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */