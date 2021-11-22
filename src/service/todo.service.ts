import {DocumentDefinition, FilterQuery, QueryOptions} from "mongoose";
import TodoModel, {TodoDocument} from "../models/todo.model";

//export async function createTodo (input: DocumentDefinition<Omit<TodoDocument, "createdAt" | "updatedAt">>) {
export async function createTodo (input: TodoDocument) {
    try {
        const todo = await TodoModel.create(input);
        return todo.toJSON();
    } catch (e: any) {
        throw new Error(e);
    }
    /*
    finally {
        console.log("lief nicht so gut");
    }*/
}

export async function findTodoState(title: string) {
    return null;
}

export async function findTodo(title: string) {
    return TodoModel.findOne({title: title});
}

export async function findTodos(/*query: FilterQuery<TodoDocument>*/){
    return TodoModel.find({}, 'title description priority complete');
}

export async function deleteTodo(query: FilterQuery<TodoDocument>){
    return TodoModel.deleteOne(query);
}