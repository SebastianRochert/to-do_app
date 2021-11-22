import {ActionType} from "./action-types";
import {Dispatch} from "redux";
import {Action} from "./actions";
import {TodoDocument} from "../models/todo.model";

export const createTodoAction = (todoD: TodoDocument) => {
    return {
        type: ActionType.CREATE,
        payload: todoD
    }
}

export const deleteTodoAction = (title: string) => {
    return {
        type: ActionType.DELETE,
        payload: title
    }
}