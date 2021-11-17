import {Request, Response} from "express";
import logger from "../utils/logger";
import {createTodo, deleteTodo, findTodo, findTodos} from "../service/todo.service";
import {CreateTodoInput, DeleteTodoInput, GetTodoInput} from "../schema/todo.schema";
import {omit} from "lodash";
import {store} from "../redux";
import {actionCreators} from "../redux/index";
import {TodoDocument} from "../models/todo.model";
import {bindActionCreators} from "redux";
import {getTodo, getTodos} from "../redux/selectors";

const {createTodoAction, deleteTodoAction} = bindActionCreators(actionCreators, store.dispatch);


export async function createTodoHandler(
    req: Request<{}, {}, CreateTodoInput["body"]>,
    res: Response) {

    try {
        // write in DB
        const todo = await createTodo(<TodoDocument>req.body);
        logger.info("Todo was successfully added to DB");

        // write in cache
        createTodoAction(<TodoDocument>req.body);
        logger.info("Todo was successfully added to state!");

        return res.send(todo);

    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message); // 409 conflict, violation of the unique restriction on the title field. Means a to do with that title is already existing
    }
}

export async function getTodoHandler(req: Request<GetTodoInput["params"]>, res: Response) {
    const todoTitle = req.params.title;

    // Suche in der DB
    //const todo = await findTodo(todoTitle);

    const todo = getTodo(store.getState(), todoTitle);

    if (!todo) {
        return res.sendStatus(404);
    }
    // console.log(getTodo(store.getState(), todoTitle));
    console.log("Current State: ", store.getState());
    logger.info("Todo was successfully displayed")
    return res.send(omit(todo, "_id", "__v", "createdAt", "updatedAt"));
}

export async function getTodosHandler(req: Request, res: Response) {
    // Suche in der DB
    // const todos = await findTodos();

    const todos = store.getState();

    if (!todos) {
        return res.sendStatus(404);
    }
    logger.info("Todos was successfully displayed in API!");

    // console.log(getTodoAction());
    // console.log("Current state: ", store.getState());
    return res.send(todos);
}

export async function deleteTodoHandler(req: Request<DeleteTodoInput["params"]>, res: Response) {
    const todoTitle = req.params.title;
    const todo = getTodo(store.getState(), todoTitle);

    if (!todo) {
        logger.info(`No Todo found by Todo-Title:${todoTitle}`);
        return res.sendStatus(404);
    }

    await deleteTodo({todoTitle});

    // Redux
    deleteTodoAction(todoTitle);

    logger.info(`Todo "${todoTitle}" was successfully deleted!`);
    // return res.sendStatus(200);
    return res.send(`Todo "${todoTitle}" was successfully deleted!`);
}
