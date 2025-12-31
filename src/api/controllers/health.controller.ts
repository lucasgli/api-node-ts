import { Request, Response } from 'express';
import { healthService } from '../../services/health.service';


class HealthController {
  handle(_: Request, res: Response) {
    const result = healthService.execute();
    return res.json(result);
  }
}

export const healthController = new HealthController();
