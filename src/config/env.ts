import 'dotenv/config';
import type { SignOptions } from 'jsonwebtoken';

export const env = {
  port: Number(process.env.PORT) || 3333,
  nodeEnv: process.env.NODE_ENV || 'development',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || '',
    name: process.env.DB_NAME || 'api_rest',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret',
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'],
  },
};
