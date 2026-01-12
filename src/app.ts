import express from 'express';
import { routes } from './api/routes';
import { errorMiddleware } from './api/middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);