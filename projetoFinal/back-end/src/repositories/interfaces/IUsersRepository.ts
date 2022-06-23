import User from "../../models/users/User";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  create(user: Pick<User, "name" | "email" | "password">): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
