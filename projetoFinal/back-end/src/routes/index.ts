import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

const routes = Router();

routes.get("/users", (request, response) => {
    console.log("Hello Users");

    return response.json({ message: "Hello Users" });
    
});

routes.post("/users", async (request, response) => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const newUser = await createUserService.execute({ name, email, password });
    
    return response.json(newUser);
    
});

routes.patch("/users/:id", (request, response) => {
    console.log("Hello Users");

    return response.json({ message: "Hello Users" });
    
});

routes.delete("/users/:id", (request, response) => {
    console.log("Hello Users");

    return response.json({ message: "Hello Users" });
    
});




export default routes;