import {ActionType} from "./action-types";
import {TodoDocument} from "../models/todo.model";
import {DocumentDefinition} from "mongoose";

interface CreateAction {
    type: ActionType.CREATE,
    payload: DocumentDefinition<Omit<TodoDocument, "createdAt" | "updatedAt">>
}

interface GetAction {
    type: ActionType.GET
}

interface DeleteAction {
    type: ActionType.DELETE
}

export type Action = CreateAction | GetAction | DeleteAction;