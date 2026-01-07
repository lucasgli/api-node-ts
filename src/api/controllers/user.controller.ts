import type { Request, Response } from "express";
import { UserService } from "../../services/user.service";

class UserController {
  private readonly service = new UserService();

  async create(req: Request, res: Response) {
    const user = await this.service.create(req.body);
    return res.status(201).json(user);
  }

  async list(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const search = String(req.query.search ?? "").trim();

    const { data, total } = await this.service.list({ page, limit, search });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return res.json({
      data,
      limit,
      page,
      total,
      totalPages,
    });
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
