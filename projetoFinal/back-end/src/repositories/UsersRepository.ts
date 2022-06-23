import User from "../models/users/User";
import { getRepository, Repository } from "typeorm";
import IUsersRepository from "./interfaces/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async create(
    user: Pick<User, "name" | "email" | "password">
  ): Promise<User> {
    const new_user = this.ormRepository.create(user);
    return await this.ormRepository.save(new_user);
  }

  public async update(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsersRepository;
