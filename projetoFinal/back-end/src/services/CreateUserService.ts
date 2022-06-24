import { hash } from "bcrypt";
import AppError from "../errors/AppError";
import User from "../models/users/User";
import UsersRepository from "../repositories/UsersRepository";

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: Pick<User, "name" | "email" | "password">) {
        const userRepository = new UsersRepository();

        if (await userRepository.findByEmail(email)) {
            throw new AppError("User already exists", 409);
        }

        const hashedPassword = await hash(password, 8);

        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        let userWithoutPassword: Partial<User> = {...user};
        delete userWithoutPassword.password;

        return userWithoutPassword;
    }
}

export default CreateUserService;
