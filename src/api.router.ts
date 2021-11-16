import {Request, Response} from "express";
import {NextFunction} from "express";
import express from 'express';
import logger from "./utils/logger";
import validateResources from "./middleware/validateResources";
import {createTodoSchema, deleteTodoSchema} from "./schema/todo.schema";
import {createTodoHandler, deleteTodoHandler, getTodoHandler, getTodosHandler} from "./controller/todo.controller";

const apiRouter = express.Router();

apiRouter.post("/todos", validateResources(createTodoSchema), createTodoHandler);// Route, Routen spezifische Middleware / Handler

apiRouter.get("/todo/:title", getTodoHandler);

apiRouter.get("/todos", getTodosHandler);

apiRouter.delete("/todos/:title", validateResources(deleteTodoSchema), deleteTodoHandler);

export default apiRouter;