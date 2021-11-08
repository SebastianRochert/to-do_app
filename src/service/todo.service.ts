import {DocumentDefinition, FilterQuery} from "mongoose";
import TodoModel, {TodoDocument} from "../models/todo.model";

export async function createTodo (input: DocumentDefinition<Omit<TodoDocument, "createdAt" | "updatedAt">>) {
    try {
        const todo = await TodoModel.create(input);
        return todo.toJSON();
    } catch (e: any) {
        throw new Error(e);
    }
}