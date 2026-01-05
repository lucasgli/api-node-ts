import type { Request, Response } from 'express';
import { UserService } from '../../services/user.service';

class UserController {
  private readonly service = new UserService();

  async create(req: Request, res: Response) {
    const user = await this.service.create(req.body);
    return res.status(201).json(user);
  }

  async list(_: Request, res: Response) {
    const users = await this.service.list();
    return res.json(users);
  }

  async getById(req: Request, res: Response) {
    const user = await this.service.getById(req.params.id);
    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.service.update(req.params.id, req.body);
    return res.json(user);
  }

  async remove(req: Request, res: Response) {
    const result = await this.service.remove(req.params.id);
    return res.status(200).json(result);
  }
}

export const userController = new UserController();
