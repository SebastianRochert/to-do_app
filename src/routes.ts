import {Express, Request, Response} from "express";
import validateResources from "./middleware/validateResources";
import {
    createTodoHandler,
    deleteTodoHandler,
    getTodoHandler,
    getTodosHandler
} from "./controller/todo.controller";
import {createTodoSchema, deleteTodoSchema} from "./schema/todo.schema";

function routes(app: Express){

    app.post("/api/todos", validateResources(createTodoSchema), createTodoHandler);// Route, Routen spezifische Middleware / Handler

    app.get("/api/todo/:title", getTodoHandler);

    app.get("/api/todos", getTodosHandler);

    app.delete("/api/todos/:title", validateResources(deleteTodoSchema), deleteTodoHandler);
}

export default routes;
