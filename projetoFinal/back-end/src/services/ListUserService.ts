import User from "../models/users/User";
import UsersRepository from "../repositories/UsersRepository";
import AppError from "../errors/AppError";

class ListUserService {
    public async execute({email}: {email?: string}): Promise<Partial<User>[] | Partial<User>> {

        const userRepository = new UsersRepository();

        if (!email){

            const users = await userRepository.findAll();
            
            return users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            });
        }else{

            const user = await userRepository.findByEmail(email);

            if (!user){
              throw new AppError('User not found', 404);
            }

            let userWithoutPassword: Partial<User> = {...user};
            delete userWithoutPassword.password;
    
            return userWithoutPassword;
        }
        
    }
}

export default ListUserService;