import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
import UpdateUserService from "../services/UpdateUserService";
import AuthenticateUserService from "../services/AuthenticateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import AppError from "../errors/AppError";

const routes = Router();

routes.post("/sessions", async (request, response) => {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({ email, password });
    
    return response.json({ user, token });

});

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

routes.use(ensureAuthenticated);

routes.patch("/users/:id", async (request, response) => {
    const { id } = request.params;
    const data = request.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute(id, data);

    return response.json(user);
});

routes.delete("/users/:id", async (request, response) => {
    const { id } = request.params;
    const userId = request.user.id;

    if (id === userId ){
        throw new AppError("You can't delete your own account", 400);
    }

    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(id);

    return response.status(204).json();
});

export default routes;
