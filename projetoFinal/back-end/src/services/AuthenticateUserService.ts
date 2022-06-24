import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";
import User from "../models/users/User";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: Partial<User>;
    token: string;
}

export default class AuthenticateUserService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Password does not match", 404);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        let userWithoutPassword: Partial<User> = { ...user };
        delete userWithoutPassword.password;

        return {
            user: userWithoutPassword,
            token,
        };
    }
}
