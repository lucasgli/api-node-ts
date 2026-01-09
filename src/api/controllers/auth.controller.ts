import { Request, Response } from 'express';
import { AuthService } from '../../services/auth.service';

class AuthController {
  private service = new AuthService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await this.service.login(email, password);

    return res.json(result);
  }
}

export const authController = new AuthController();