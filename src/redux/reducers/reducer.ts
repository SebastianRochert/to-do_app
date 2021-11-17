import {Action} from "../actions";
import {ActionType} from "../action-types";
import {TodoDocument} from "../../models/todo.model";
import {array} from "zod";

/*
Rules of Reducers:

    - They should only calculate the new state value based on the state and action arguments
    - They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
    - They must not do any asynchronous logic or other "side effects"

*/

const initialState = {todos: []};

const reducer = (state:{todos: TodoDocument[]} = initialState, action: Action) => { //action has a type and a payload
    switch (action.type){
        case ActionType.CREATE:
            return {...state,
                todos: [
                    ...state.todos,
                    {
                        title: action.payload.title,
                        description: action.payload.description,
                        priority: action.payload.priority,
                        complete: action.payload.complete
                    }
                ]
            };
        case ActionType.DELETE:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.title !== action.payload) {
                        return todo;
                    }
                })
            };
        default:
            return state;
    }
}

/*
const initialStateMap = new Map<string, TodoDocument>();

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
            state.set(action.payload.title, action.payload);
            return new Map(state.entries());
        case ActionType.DELETE:
            state.delete(action.payload);
            return new Map(state.entries());
        default:
            return state;
    }
}
*/
export default reducer;