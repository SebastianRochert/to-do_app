import {ActionType} from "./action-types";
import {Dispatch} from "redux";
import {Action} from "./actions";
import {TodoDocument} from "../models/todo.model";
import {DocumentDefinition} from "mongoose";
import {store} from "./store";
import {createAction} from "@reduxjs/toolkit";

export const createTodoAction = (todoD: TodoDocument) => {
    return {
        type: ActionType.CREATE,
        payload: todoD
    }
}

export const getTodoAction = () => {
    return {
        type: ActionType.GET
    }
}

export const deleteTodoAction = (title: string) => {
    return {
        type: ActionType.DELETE,
        payload: title
    }
}