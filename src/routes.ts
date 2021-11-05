import {Express, Request, Response} from "express";
import validateResources from "./middleware/validateResources";
import {createTodoHandler} from "./controller/todo.controller";
import {createTodoSchema} from "./schema/todo.schema";

function routes(app: Express){
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/todos", validateResources(createTodoSchema), createTodoHandler);
}

export default routes;