/**
 * Centralized Error Handling Middleware
 * Provides consistent error responses and prevents leaking sensitive information
 */

export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err);

  // Don't leak sensitive error details in production
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = err.statusCode || 500;
  const message = isProduction
    ? "Une erreur interne s'est produite. Veuillez réessayer plus tard."
    : err.message || 'Erreur interne du serveur';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  });
};

/**
 * Handle 404 - Route Not Found
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: "La ressource demandée n'existe pas. Vérifiez l'URL.",
  });
};
