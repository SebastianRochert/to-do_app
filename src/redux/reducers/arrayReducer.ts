import {Action} from "../actions";
import {ActionType} from "../action-types";
import {TodoDocument} from "../../models/todo.model";

const initialState: TodoDocument[] = [];

const reducer = (state: TodoDocument[] = initialState, action: Action) => { //action has a type and a payload
    switch (action.type){
        case ActionType.CREATE:
            const ClonedArray: TodoDocument[] = [];
            for(let i of state) {
                ClonedArray.push(i);
            }
            ClonedArray.push(action.payload);
            return ClonedArray;
        case ActionType.DELETE:
            const ClonedArray2: TodoDocument[] = [];
            for(let i of state) {
                if(i.title !== action.payload) {
                    ClonedArray2.push(i);
                }
            }
            return ClonedArray2;
        default:
            return state;
    }
}

export default reducer;