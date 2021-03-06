import express from 'express';
import logger from "./utils/logger";
import validateResources from "./middleware/validateResources";
import {createTodoSchema, deleteTodoSchema} from "./schema/todo.schema";
import {createTodoHandler, deleteTodoHandler, getTodoHandler, getTodosHandler} from "./controller/todo.controller";
import {testApp} from "./test";

const apiRouter = express.Router();

apiRouter.post("/", validateResources(createTodoSchema), createTodoHandler);// Route, Routen spezifische Middleware / Handler

apiRouter.get("/:title", getTodoHandler);

apiRouter.get("/", getTodosHandler);

apiRouter.get("/test", testApp);

//apiRouter.get("/byTitle", getTodosByTitleHandler);

apiRouter.delete("/:title", validateResources(deleteTodoSchema), deleteTodoHandler);

export default apiRouter;