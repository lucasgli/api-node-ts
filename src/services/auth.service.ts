import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppErrors";
import { env } from "../config/env";

export class AuthService {
  constructor(private readonly repo = new UserRepository()) {}

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign({}, env.jwt.secret, {
      subject: user.id,
      expiresIn: env.jwt.expiresIn,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
