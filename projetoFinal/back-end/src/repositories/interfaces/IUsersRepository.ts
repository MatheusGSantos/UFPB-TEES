import User from "../../models/User";

export default interface IUsersRepository {

    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(user: Pick<User, "name" | "email" | "password">): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}