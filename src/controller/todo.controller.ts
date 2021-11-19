import {Request, Response} from "express";
import logger from "../utils/logger";
import {createTodo, deleteTodo} from "../service/todo.service";
import {CreateTodoInput, DeleteTodoInput, GetTodoInput} from "../schema/todo.schema";
import {store} from "../redux";
import {actionCreators} from "../redux/index";
import {TodoDocument} from "../models/todo.model";
import {bindActionCreators} from "redux";
import {getTodo, getTodos} from "../redux/selectors";
import {performance} from "perf_hooks";
import {myPerformanceObserver} from "../performance/myPerformanceObserver";
import {PerformanceType} from "../performance/performance-types";

const {createTodoAction, deleteTodoAction} = bindActionCreators(actionCreators, store.dispatch);

myPerformanceObserver.observe({entryTypes: ["measure"]});

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
    const todo = getTodo(store.getState(), todoTitle);

    if (!todo) {
        return res.sendStatus(404);
    }

    logger.info("Todo was successfully displayed")
    return res.send(todo);
}

export async function getTodosHandler(req: Request, res: Response) {
    performance.mark("start");
    const todos = getTodos(store.getState());

    if (!todos) {
        return res.sendStatus(404);
    }
    logger.info("Todos was successfully displayed in API!");

    performance.mark("stop");
    performance.measure(PerformanceType.GET, "start", "stop");

    return res.send(todos);
}

export async function deleteTodoHandler(req: Request<DeleteTodoInput["params"]>, res: Response) {
    performance.mark("start");
    const todoTitle = req.params.title;
    const todo = getTodo(store.getState(), todoTitle);

    if (!todo) {
        logger.info(`No Todo found by Todo-Title:${todoTitle}`);
        return res.sendStatus(404);
    }

    await deleteTodo({todoTitle});

    deleteTodoAction(todoTitle);

    logger.info(`Todo "${todoTitle}" was successfully deleted!`);
    // return res.sendStatus(200);
    performance.mark("stop");
    performance.measure(PerformanceType.DELETE, "start", "stop");
    return res.send(`Todo "${todoTitle}" was successfully deleted!`);
}
