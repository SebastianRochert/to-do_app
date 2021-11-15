import {Action} from "../actions";
import {ActionType} from "../action-types";
import {TodoDocument} from "../../models/todo.model";
import {findTodos} from "../../service/todo.service";

const initialState = new Map<string, TodoDocument>();
createInitialState();

async function createInitialState() {
    const todos = await findTodos();

    for (let i in todos) {
        const temp = todos[i];
        const body = {"title": temp.title, "description": temp.description, "priority": temp.priority, "complete": temp.complete};
        const todo = <TodoDocument>body;
        initialState.set(temp.title, todo);
    }
}

const reducer = (state: Map<string, TodoDocument> = initialState, action: Action) => { //action has a type and a payload
    switch (action.type){
        case ActionType.CREATE:
            return state.set(action.payload.title, action.payload);
        case ActionType.GET:
            return state;
        case ActionType.DELETE:
            state.delete(action.payload);
            return state;
        default:
            return state;
    }
}

export default reducer;