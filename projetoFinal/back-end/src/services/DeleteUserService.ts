import AppError from "../errors/AppError";
import User from "../models/users/User";
import UsersRepository from "../repositories/UsersRepository";
import validateUUIDv4 from "../utils/validateUUIDv4";


class DeleteUserService {
    public async execute(id: string): Promise<void> {
        if(!validateUUIDv4(id)) {
            throw new AppError("Invalid id", 400);
        }

        const userRepository = new UsersRepository();

        const user = userRepository.findById(id);

        if(!user){
            throw new AppError('User not found', 404);
        }

        await userRepository.delete(id);
    }
}

export default DeleteUserService;