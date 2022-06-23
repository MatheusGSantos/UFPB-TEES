import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
import UpdateUserService from "../services/UpdateUserService";

const routes = Router();

routes.get("/users", async (request, response) => {
    const { email } = request.query;

    const listUser = new ListUserService();
    const users = await listUser.execute({ email: email as string });

    return response.json(users);
});

routes.post("/users", async (request, response) => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const newUser = await createUserService.execute({ name, email, password });

    return response.json(newUser);
});

routes.patch("/users/:id", async (request, response) => {
    const { id } = request.params;
    const data = request.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute(id, data);

    return response.json(user);
});

routes.delete("/users/:id", async (request, response) => {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(id);

    return response.status(204).json();
});

export default routes;
