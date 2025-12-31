import 'dotenv/config';

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

export const env = {
  port,
  nodeEnv: process.env.NODE_ENV ?? 'development',
};