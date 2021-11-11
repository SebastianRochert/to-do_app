import {ActionType} from "./action-types";
import {TodoDocument} from "../models/todo.model";

interface CreateAction {
    type: ActionType.CREATE,
    payload: TodoDocument
}

interface GetAction {
    type: ActionType.GET
}

interface DeleteAction {
    type: ActionType.DELETE,
    payload: string
}

export type Action = CreateAction | GetAction | DeleteAction;