import AppError from "../errors/AppError";
import User from "../models/users/User";
import UsersRepository from "../repositories/UsersRepository";
import validateUUIDv4 from "../utils/validateUUIDv4";

class UpdateUserService {
    public async execute(
        id: string,
        newUserData: Partial<User>
    ): Promise<Partial<User>> {
        if(!validateUUIDv4(id)) {
          throw new AppError("Invalid id", 400);
        }
        
        const usersRepository = new UsersRepository();
        let user = await usersRepository.findById(id);

        if(!user){
            throw new AppError('User not found', 404);
        }

        user = {
            ...user,
            ...newUserData
        }

        await usersRepository.update(user);

        let userWithoutPassword: Partial<User> = {...user};
        delete userWithoutPassword.password;

        return userWithoutPassword;
        
    }
}

export default UpdateUserService;
