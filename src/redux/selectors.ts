import {RootState} from "./store";
import {TodoEntry} from "../models/todo.model";

export const getTodos = (state: RootState): TodoEntry[] => {
    return state.todoList.map((v) => {
        const {_id, title, description, priority, complete, createdAt, updatedAt} = v;
        return {title, description, priority, complete, createdAt, updatedAt};
    })
}

export const getTodo = (state: RootState, title: string) => {
    for(let i of state.todoList) {
        if(title === i.title) {
            return i;
        }
    }
}
