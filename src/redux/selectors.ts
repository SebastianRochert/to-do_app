import {RootState} from "./store";
import {TodoEntry} from "../models/todo.model";


export const getTodos = (state: RootState): TodoEntry[] => {
    return Array.from(state.todoList, ([title, doc]) => doc as unknown as TodoEntry);
}

export const getTodo = (state: RootState, title: string): TodoEntry | undefined => {
    return getTodos(state).find((v) => v.title === title);
}
