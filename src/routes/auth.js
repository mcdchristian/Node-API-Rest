import express from 'express';
import { User } from '../db/sequelize.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';
import { validateRequest } from '../middleware/validation.js';
import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Validation schema
const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

/**
 * POST /api/auth/login - User login
 */
router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        message: 'Identifiant ou mot de passe incorrect.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Identifiant ou mot de passe incorrect.',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, privateKey, {
      expiresIn: process.env.JWT_EXPIRATION || '24h',
    });

    // Don't send password hash in response
    // eslint-disable-next-line no-unused-vars
    const { password: _password, ...userWithoutPassword } = user.dataValues;
    res.json({
      message: 'Connexion réussie.',
      data: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
