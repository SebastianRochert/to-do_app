import mongoose from "mongoose";

export interface TodoDocument extends mongoose.Document {
    title: string;
    description: string;
    complete: string;
    //priority: string;
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    //priority: {type: Number, required: false},
    complete: {type: String, required: true},
}, {
    timestamps: true,
})

const TodoModel = mongoose.model<TodoDocument>("Todo", todoSchema);

export default TodoModel;