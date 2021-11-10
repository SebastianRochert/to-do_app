import {Express, Request, Response} from "express";
import validateResources from "./middleware/validateResources";
import {
    createTodoHandlerRedux,
    deleteTodoHandler,
    getTodoHandler,
    getTodosHandler
} from "./controller/todo.controller";
import {createTodoSchema, deleteTodoSchema} from "./schema/todo.schema";
import {createTodo} from "./service/todo.service";
import {createTodoRedux} from "./redux/action-creators";

function routes(app: Express){
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    //Can be called via Terminal curl http://localhost:1338/healthcheck

    //app.post("/api/todos", validateResources(createTodoSchema), createTodoHandler);// Route, Routen spezifische Middleware / Handler

    app.get("/api/todo", getTodoHandler);

    app.get("/api/todos", getTodosHandler);

    app.delete("/api/todos/:title", validateResources(deleteTodoSchema), deleteTodoHandler);

    // Redux
    app.post("/api/todos", /*validateResources(createTodoSchema),*/ createTodoHandlerRedux);// Route, Routen spezifische Middleware / Handler
}

export default routes;