import Joi from 'joi';

export function validateFollowUnFollowRequest(body) {
  const schema = Joi.object({
    followedBy: Joi.string().min(1).max(40).required(),
    followingTo: Joi.string().min(1).max(40).required(),
  });
  return schema.validate(body);
}