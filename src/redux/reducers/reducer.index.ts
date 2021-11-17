import {combineReducers} from "redux";
import reducer from "./arrayReducer"

const reducers = combineReducers({
    todoList: reducer
})

export default reducers;

//export type State = ReturnType<typeof reducers>