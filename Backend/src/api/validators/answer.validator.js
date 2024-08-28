import Joi from 'joi';

export function validateCreateAnswerRequest(body) {
  const schema = Joi.object({
    content: Joi.string().min(1).max(20000).required(),
    createdBy: Joi.string().min(1).max(40).required(),
    questionId: Joi.string().min(1).max(40).required(),
    tags: Joi.allow()
  });
  return schema.validate(body);
}

export function validateEditAnswerRequest(body) {
  const schema = Joi.object({
    _id : Joi.string().min(1).max(40).required(),
    content: Joi.string().min(1).max(20000).required(),
    tags: Joi.allow()
  });
  return schema.validate(body);
}