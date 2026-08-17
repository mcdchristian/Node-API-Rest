import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.JWT_SECRET_KEY || 'fallback_secret_key';

if (!process.env.JWT_SECRET_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET_KEY must be defined in production environment!');
}

export default privateKey;
