import mongoose from "mongoose";
import {customAlphabet} from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10); // Id is 10 characters long

export interface TodoEntry {
    title: string;
    description: string;
    priority: number;
    complete: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TodoDocument = TodoEntry & mongoose.Document;

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    priority: {type: Number, required: false, default: 0},
    complete: {type: String, required: true},
}, {
    timestamps: true,
})

const TodoModel = mongoose.model<TodoDocument>("Todo", todoSchema);

export default TodoModel;
