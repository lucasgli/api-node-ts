import { app } from './app';
import { AppDataSource } from './config/database/data-source';
import { env } from './config/env';


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
