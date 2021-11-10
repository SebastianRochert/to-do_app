import {Action} from "../actions";
import {ActionType} from "../action-types";
import TodoModel from "../../models/todo.model";
import {PayloadAction} from "@reduxjs/toolkit";
import {AnyAction} from "redux";

const initialState = 0;

const reducer = (state: number = initialState, action: Action) => { //action has a type and a payload
    switch (action.type){
        case ActionType.CREATE:
            try {
                const todo = TodoModel.create(action.payload);
            } catch (e: any) {
                throw new Error(e);
            }
            return state += 1;
        case ActionType.GET:
            return state;
        case ActionType.DELETE:
            return state -= 1;
        default:
            return state;
    }
}

export default reducer;