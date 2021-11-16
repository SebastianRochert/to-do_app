import {Dispatch, MiddlewareAPI} from "redux";
import {Action} from "../redux/actions";
import {ActionType} from "../redux/action-types";
import {findTodos} from "../service/todo.service";
import {createTodoAction} from "../redux/action-creators";

// Redux Logger as seen on https://redux.js.org/understanding/history-and-design/middleware#problem-logging
export const reduxLogger = (api: MiddlewareAPI) => (next: (arg0: any) => any) => (action: Action) => {
    console.log("dispatching: ", action);
    let result = next(action);
    console.log("Next State: ", api.getState());
    return result;
}

export const crashReporter = () => (next: (arg0: any) => any) => (action: Action) => {
    try {
        return next(action);
    } catch (e: any) {
        console.error("Caught an exeption!", e)
        throw new Error(e);
    }
}

export const loadStateMiddleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    if(action.type === ActionType.REHYDRATION) {
        next(action);
        const todos = findTodos().then((todos) => {
            for(let todo of todos) {
                api.dispatch(createTodoAction(todo));
            }
        });
    } else {
        next(action);
    }
    console.log(action.type);
}