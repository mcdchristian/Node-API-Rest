import Joi from 'joi';

/**
 * Validation Schemas
 */
export const validationSchemas = {
  login: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  }),

  createPokemon: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    hp: Joi.number().integer().min(0).max(1000).required(),
    cp: Joi.number().integer().min(0).max(10000).required(),
    picture: Joi.string().uri().optional(),
    types: Joi.string().optional(),
    userId: Joi.number().integer().optional(),
  }),

  updatePokemon: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    hp: Joi.number().integer().min(0).max(1000).optional(),
    cp: Joi.number().integer().min(0).max(10000).optional(),
    picture: Joi.string().uri().optional(),
    types: Joi.string().optional(),
  }),

  searchPokemon: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    limit: Joi.number().integer().min(1).max(100).optional(),
  }),
};

/**
 * Validation Middleware Factory
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: 'Erreur de validation des données',
        details: error.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    req.validatedData = value;
    next();
  };
};

/**
 * Validate Query Parameters
 */
export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      return res.status(400).json({
        message: 'Erreur de validation des paramètres',
        details: error.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    req.validatedQuery = value;
    next();
  };
};
