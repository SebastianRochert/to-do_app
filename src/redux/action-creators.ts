import {ActionType} from "./action-types";
import {Dispatch} from "redux";
import {Action} from "./actions";
import {TodoDocument} from "../models/todo.model";
import {DocumentDefinition} from "mongoose";
import {store} from "./store";

export const createTodoRedux = (todoD: DocumentDefinition<Omit<TodoDocument, "createdAt" | "updatedAt">>) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CREATE,
            payload: todoD
        })
    }
}

export const getTodoRedux = (amount: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET
        })
    }
}

export const deleteTodoRedux = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETE
        })
    }
}