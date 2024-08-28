import Joi from 'joi';

export function validateCreateQuestionRequest(body) {
  const schema = Joi.object({
    content: Joi.string().min(1).max(20000).required(),
    title: Joi.string().min(1).max(20000).required(),
    createdBy: Joi.string().min(1).max(40).required(),
    tags: Joi.allow()
  });
  return schema.validate(body);
}

export function validateEditQuestionRequest(body) {
  const schema = Joi.object({
    _id :Joi.string().min(1).max(40).required(),
    content: Joi.string().min(1).max(20000),
    title: Joi.string().min(1).max(20000),
    tags: Joi.allow()
  });

  return schema.validate(body);
}