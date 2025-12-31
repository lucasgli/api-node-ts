import express from 'express';
import { routes } from './api/routes';
import { errorMiddleware } from './api/middlewares/error.middleware';



export const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);