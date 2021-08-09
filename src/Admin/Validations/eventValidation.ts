import Joi from '@hapi/joi'

export const eventValidator = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required(),
  bookTiketButton: Joi.string().required(),
  details: Joi.string().required()
})