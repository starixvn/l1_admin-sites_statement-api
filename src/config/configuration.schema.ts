import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
  MONGODB_DB_NAME: Joi.string().required(),
});
