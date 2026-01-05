import { app } from './app';
import { env } from './config/env';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  await AppDataSource.initialize();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
