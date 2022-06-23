import User from "../models/users/User";
import UsersRepository from "../repositories/UsersRepository";

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: Pick<User, "name" | "email" | "password">) {
    const userRepository = new UsersRepository();

    const user = await userRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
