import {Request, Response} from "express";
import logger from "../utils/logger";
import {createTodo} from "../service/todo.service";
import {CreateTodoInput} from "../schema/todo.schema";

export async function createTodoHandler(
    req: Request<{}, {}, CreateTodoInput["body"]>,
    res: Response){

    try {
        const todo = await createTodo(req.body);

        return res.send(todo);

    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message); // 409 conflict, violation of the unique restriction on the title field. Means a to do with that title is already existing
    }
}