import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../utils/AppErrors';

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

export class UserService {
  constructor(private readonly repo = new UserRepository()) {}

  private sanitize(user: any) {
    // remove password do retorno
    // (mantém simples e direto)
    const { password, ...safe } = user;
    return safe;
  }

  async create({ name, email, password }: CreateUserDTO) {
    const exists = await this.repo.findByEmail(email);
    if (exists) throw new AppError('Email already in use', 409);

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.repo.create({
      name,
      email,
      password: hashed,
    });

    return this.sanitize(user);
  }

  async list() {
    const users = await this.repo.findMany();
    return users.map((u) => this.sanitize(u));
  }

  async getById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new AppError('User not found', 404);

    return this.sanitize(user);
  }

  async update(id: string, data: UpdateUserDTO) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError('User not found', 404);

    if (data.email && data.email !== existing.email) {
      const emailInUse = await this.repo.findByEmail(data.email);
      if (emailInUse) throw new AppError('Email already in use', 409);
    }

    const payload: UpdateUserDTO = { ...data };

    if (data.password) {
      payload.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await this.repo.update(id, payload);
    if (!updated) throw new AppError('User not found', 404);

    return this.sanitize(updated);
  }

  async remove(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError('User not found', 404);

    await this.repo.delete(id);
    return { message: 'User deleted' };
  }
}
