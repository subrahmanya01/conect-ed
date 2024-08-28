import Joi from 'joi';

export function validateNewNotification(body) {
  const schema = Joi.object({
    userId: Joi.string().min(1).max(40).required(),
    link: Joi.allow(),
    message: Joi.string().min(1).required(),
    isRead: Joi.boolean().allow()
  });
  return schema.validate(body);
}