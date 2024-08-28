import Joi from 'joi';

export function validateNewChat(body) {
  const schema = Joi.object({
    from: Joi.string().min(1).max(40).required(),
    to: Joi.string().min(1).max(40).required(),
    message: Joi.string().min(1)
  });
  return schema.validate(body);
}