import {Request, Response} from "express";
import logger from "../utils/logger";
import {createTodo, deleteTodo, findTodo, findTodos} from "../service/todo.service";
import {CreateTodoInput, DeleteTodoInput} from "../schema/todo.schema";
import {omit} from "lodash";

export async function createTodoHandler(
    req: Request<{}, {}, CreateTodoInput["body"]>,
    res: Response) {

    try {
        const todo = await createTodo(req.body);

        logger.info("Todo was successfully added to the Todo-List!")
        return res.send(todo);

    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message); // 409 conflict, violation of the unique restriction on the title field. Means a to do with that title is already existing
    }
}

export async function getTodoHandler(req: Request, res: Response) {
    const todoId = req.params.todoId;
    const todo = await findTodo({todoId});

    if (!todo) {
        return res.sendStatus(404);
    }
    logger.info("Todo was successfully displayed!")
    return res.send(omit(todo, "_id", "__v", "createdAt", "updatedAt"));
}

export async function getTodosHandler(req: Request, res: Response) {
    const todos = await findTodos({});

    if (!todos) {
        return res.sendStatus(404);
    }
    logger.info("Todo was successfully displayed!")
    return res.send(omit(todos, "_id", "__v", "createdAt", "updatedAt"));
}

export async function deleteTodoHandler(req: Request<DeleteTodoInput["params"]>, res: Response) {
    const todoTitle = req.params.title;

    const todo = await findTodo({todoTitle});

    if (!todo) {
        logger.info(`No Todo found by Todo-Title:${todoTitle}`);
        return res.sendStatus(404);
    }

    await deleteTodo({todoTitle});

    logger.info("Delete was successfull!");
    return res.sendStatus(200);
}