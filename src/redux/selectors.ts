import {RootState, store} from "./store";
import {TodoEntry} from "../models/todo.model";
import {result} from "lodash";


export const getTodos = (state: RootState): TodoEntry[] => {
    return state.todoList.map((v) => {
        const {_id, title, description, priority, complete, createdAt, updatedAt} = v;
        return {title, description, priority, complete, createdAt, updatedAt};
    })
}
/*
export const getTodo = (state: RootState, title: string): TodoEntry | undefined => {
    return getTodos(state).find((v) => v.title === title);
}
 */

export const getTodo = (state: RootState, title: string) => {
    for(let i of state.todoList) {
        if(title === i.title) {
            return i;
        }
    }
}
