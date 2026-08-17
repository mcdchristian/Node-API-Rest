import jwt from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';

/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header
 */
export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message: "Jeton d'authentification manquant. Fourni un token dans l'en-tête Authorization.",
    });
  }

  // Extract token from "Bearer <token>" format
  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Format d\'authentification invalide. Utilisez "Bearer <token>".',
    });
  }

  const token = parts[1];

  try {
    const decodedToken = jwt.verify(token, privateKey);
    req.user = decodedToken;

    // Optionally validate userId in body matches token userId
    if (req.body.userId && req.body.userId !== decodedToken.userId) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à accéder à cette ressource.",
      });
    }

    next();
  } catch (error) {
    let message = 'Jeton invalide ou expiré.';

    if (error.name === 'TokenExpiredError') {
      message = 'Votre session a expiré. Veuillez vous reconnecter.';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Jeton malformé ou invalide.';
    }

    return res.status(401).json({ message });
  }
};
