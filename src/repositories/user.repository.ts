
import { AppDataSource } from '../config/database/data-source';
import { User } from '../entities/User';

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  create(data: { name: string; email: string; password: string }) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findMany() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: string, data: Partial<Pick<User, 'name' | 'email' | 'password'>>) {
    await this.repo.update({ id }, data);
    return this.findById(id);
  }

  delete(id: string) {
    return this.repo.delete({ id });
  }
}
