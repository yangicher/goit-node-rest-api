import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[\+]?[0-9]{10,15}$/).required(),
    favorite: Joi.boolean(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[\+]?[0-9]{10,15}$/),
    favorite: Joi.boolean(),
})

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  })
})