import express from 'express';
import { Pokemon } from '../db/sequelize.js';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { validateRequest } from '../middleware/validation.js';
import Joi from 'joi';
import auth from '../auth/auth.js';

const router = express.Router();

// Validation schemas
const createPokemonSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  hp: Joi.number().integer().min(0).max(1000).required(),
  cp: Joi.number().integer().min(0).max(10000).required(),
  picture: Joi.string().uri().optional().allow(''),
  types: Joi.string().optional().allow(''),
  userId: Joi.number().integer().optional(),
});

const updatePokemonSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  hp: Joi.number().integer().min(0).max(1000).optional(),
  cp: Joi.number().integer().min(0).max(10000).optional(),
  picture: Joi.string().uri().optional().allow(''),
  types: Joi.string().optional().allow(''),
});

/**
 * POST /api/pokemons - Create a new pokemon
 */
router.post('/', auth, validateRequest(createPokemonSchema), async (req, res, next) => {
  try {
    const pokemon = await Pokemon.create(req.validatedData);
    res.status(201).json({
      message: `Le pokémon "${req.body.name}" a été créé avec succès.`,
      data: pokemon,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: 'Erreur de validation.',
        details: error.errors,
      });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: 'Un pokémon avec ce nom existe déjà.',
        details: error.errors,
      });
    }
    next(error);
  }
});

/**
 * GET /api/pokemons/:id - Get a pokemon by ID
 */
router.get('/:id', auth, async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);

    if (!pokemon) {
      return res.status(404).json({
        message: `Le pokémon avec l'ID ${req.params.id} n'existe pas.`,
      });
    }

    res.json({
      message: 'Pokémon récupéré avec succès.',
      data: pokemon,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/pokemons/:id - Update a pokemon
 */
router.put('/:id', auth, validateRequest(updatePokemonSchema), async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);

    if (!pokemon) {
      return res.status(404).json({
        message: `Le pokémon avec l'ID ${req.params.id} n'existe pas.`,
      });
    }

    const updatedPokemon = await pokemon.update(req.validatedData);
    res.json({
      message: 'Pokémon mis à jour avec succès.',
      data: updatedPokemon,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: 'Erreur de validation.',
        details: error.errors,
      });
    }
    next(error);
  }
});

/**
 * DELETE /api/pokemons/:id - Delete a pokemon
 */
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);

    if (!pokemon) {
      return res.status(404).json({
        message: `Le pokémon avec l'ID ${req.params.id} n'existe pas.`,
      });
    }

    await pokemon.destroy();
    res.json({
      message: `Le pokémon "${pokemon.name}" a été supprimé avec succès.`,
      data: pokemon,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
