import { AppDataSource } from "../config/database/data-source";
import { User } from "../entities/User";

type PaginatedQuery = {
  page: number;
  limit: number;
};

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  create(data: { name: string; email: string; password: string }) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findMany() {
    return this.repo.find({
      order: { createdAt: "DESC" },
    });
  }

  async findManyPaginated({ page, limit }: PaginatedQuery) {
    const skip = (page - 1) * limit; // skip é o offset

    const [data, total] = await this.repo.findAndCount({
      order: { createdAt: "DESC" },
      take: limit,
      skip,
    });

    return { data, total };
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(
    id: string,
    data: Partial<Pick<User, "name" | "email" | "password">>
  ) {
    await this.repo.update({ id }, data);
    return this.findById(id);
  }

  delete(id: string) {
    return this.repo.delete({ id });
  }
}
