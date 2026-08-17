import express from 'express';
import { Pokemon } from '../db/sequelize.js';
import { Op } from 'sequelize';
import { validateQuery } from '../middleware/validation.js';
import Joi from 'joi';
import auth from '../auth/auth.js';

const router = express.Router();

// Validation schema for search
const searchSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  limit: Joi.number().integer().min(1).max(100).optional(),
});

/**
 * GET /api/pokemons - Get all pokemons with optional search
 */
router.get('/', auth, validateQuery(searchSchema), async (req, res, next) => {
  try {
    if (req.query.name) {
      const { name, limit = 5 } = req.validatedQuery || req.query;

      const { count, rows } = await Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: [['name', 'ASC']],
        limit: parseInt(limit),
      });

      return res.json({
        message: `${count} pokémon(s) trouvé(s) correspondant à "${name}".`,
        data: rows,
        count,
      });
    }

    const pokemons = await Pokemon.findAll({
      order: [['name', 'ASC']],
    });

    res.json({
      message: 'Liste des pokémons récupérée avec succès.',
      data: pokemons,
      count: pokemons.length,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
