import {Action} from "../actions";
import {ActionType} from "../action-types";
import TodoModel, {TodoDocument} from "../../models/todo.model";
import {findTodos} from "../../service/todo.service";
import {FilterQuery} from "mongoose";

const initialState = new Map<string, TodoDocument>();
/*
const cursor = TodoModel.find({}, 'title description priority complete').cursor();
for (let doc = cursor.next(); doc != null; doc = cursor.next()){
    initialState.set("test", doc);
}

 */

const reducer = (state: Map<string, TodoDocument> = initialState, action: Action) => { //action has a type and a payload
    switch (action.type){
        case ActionType.CREATE:
            return state.set(action.payload.title, action.payload);
        case ActionType.GET:
            return state;
        case ActionType.DELETE:
            console.log(action.payload);
            state.delete(action.payload);
            return state;
        default:
            return state;
    }
}

export default reducer;