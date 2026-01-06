import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppErrors";

type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserDTO = {
  name?: string;
  email?: string;
  password?: string;
};

type ListUsersDTO = {
  page?: number;
  limit?: number;
  search?: string;
};

export class UserService {
  constructor(private readonly repo = new UserRepository()) {}

  private sanitize(user: any) {
    // remove password do retorno
    // (mantém simples e direto)
    const { password, ...safe } = user;
    return safe;
  }

  async create({ name, email, password }: CreateUserDTO) {
    const hashed = await bcrypt.hash(password, 10);

    try {
      const user = await this.repo.create({
        name,
        email,
        password: hashed,
      });

      return this.sanitize(user);
    } catch (err: any) {
      if (err?.code === "ER_DUP_ENTRY") {
        throw new AppError("Email already in use", 409);
      }

      throw err;
    }
  }

  async list({ page = 1, limit = 10, search }: ListUsersDTO = {}) {
    const safePage = page > 0 ? page : 1;
    const safeLimit = limit > 0 && limit <= 100 ? limit : 10;

    const { data, total } = await this.repo.findManyPaginated({
      page: safePage,
      limit: safeLimit,
      search,
    });

    const totalPages = Math.max(1, Math.ceil(total / safeLimit));

    return {
      data: data.map((u) => this.sanitize(u)),
      limit: safeLimit,
      page: safePage,
      total,
      totalPages,
    };
  }


  async getById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new AppError("User not found", 404);

    return this.sanitize(user);
  }

  async update(id: string, data: UpdateUserDTO) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError("User not found", 404);

    const payload: UpdateUserDTO = { ...data };

    if (data.password) {
      payload.password = await bcrypt.hash(data.password, 10);
    }

    try {
      const updated = await this.repo.update(id, payload);
      if (!updated) throw new AppError("User not found", 404);

      return this.sanitize(updated);
    } catch (err: any) {
      // MySQL duplicate entry
      if (err?.code === "ER_DUP_ENTRY") {
        throw new AppError("Email already in use", 409);
      }

      throw err;
    }
  }

  async remove(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError("User not found", 404);

    await this.repo.delete(id);
    return { message: "User deleted" };
  }
}
