import {ActionType} from "./action-types";
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