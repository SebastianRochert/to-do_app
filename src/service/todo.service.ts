import {DocumentDefinition, FilterQuery, QueryOptions} from "mongoose";
import TodoModel, {TodoDocument} from "../models/todo.model";

export async function createTodo (input: DocumentDefinition<Omit<TodoDocument, "createdAt" | "updatedAt">>) {
    try {
        const todo = await TodoModel.create(input);
        return todo.toJSON();
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function findTodo(query: FilterQuery<TodoDocument>, options: QueryOptions = { lean: true }) {
    return TodoModel.findOne(query, {}, options);
}

export async function findTodos(query: FilterQuery<TodoDocument>){
    return TodoModel.find(query).lean();
}

export async function deleteTodo(query: FilterQuery<TodoDocument>){
    return TodoModel.deleteOne(query);
}