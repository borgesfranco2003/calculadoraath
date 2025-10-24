const Joi = require('joi');
const config = require('../config/config');

/**
 * Middleware de validação para geração de imagens
 */
const validateImageGeneration = (req, res, next) => {
  const schema = Joi.object({
    prompt: Joi.string()
      .min(3)
      .max(2000)
      .required()
      .messages({
        'string.empty': 'Prompt não pode estar vazio',
        'string.min': 'Prompt deve ter pelo menos 3 caracteres',
        'string.max': 'Prompt não pode ter mais de 2000 caracteres',
        'any.required': 'Prompt é obrigatório'
      }),

    numberOfImages: Joi.number()
      .integer()
      .min(1)
      .max(config.maxImageCount)
      .default(config.defaultImageCount)
      .messages({
        'number.base': 'numberOfImages deve ser um número',
        'number.min': 'numberOfImages deve ser no mínimo 1',
        'number.max': `numberOfImages deve ser no máximo ${config.maxImageCount}`
      }),

    aspectRatio: Joi.string()
      .valid(...config.aspectRatios)
      .default('1:1')
      .messages({
        'any.only': `aspectRatio deve ser um de: ${config.aspectRatios.join(', ')}`
      }),

    model: Joi.string()
      .valid(...Object.values(config.models))
      .default(config.models.imagen3)
      .messages({
        'any.only': `model deve ser um de: ${Object.values(config.models).join(', ')}`
      }),

    negativePrompt: Joi.string()
      .max(1000)
      .allow('')
      .optional()
      .messages({
        'string.max': 'negativePrompt não pode ter mais de 1000 caracteres'
      }),

    language: Joi.string()
      .length(2)
      .default('pt')
      .messages({
        'string.length': 'language deve ter 2 caracteres (ex: pt, en, es)'
      }),

    addWatermark: Joi.boolean()
      .default(false),

    safetyFilterLevel: Joi.string()
      .valid('default', 'strict', 'permissive')
      .default('default'),

    personGeneration: Joi.string()
      .valid('allow_adult', 'allow_all', 'block_all')
      .default('allow_adult')
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      error: 'Erro de validação',
      details: errors
    });
  }

  req.body = value;
  next();
};

module.exports = {
  validateImageGeneration
};
