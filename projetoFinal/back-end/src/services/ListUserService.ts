import User from "../models/users/User";
import UsersRepository from "../repositories/UsersRepository";
import AppError from "../errors/AppError";

class ListUserService {
    public async execute({email}: {email?: string}): Promise<User[] | User> {

        const userRepository = new UsersRepository();

        if (!email){

            const users = await userRepository.findAll();
            return users;
        }else{

            const user = await userRepository.findByEmail(email);

            if (!user){
              throw new AppError('User not found', 404);
            }

            return user;
        }
        
    }
}

export default ListUserService;