import {boolean, number, object, string, TypeOf} from "zod";

export const createTodoSchema = object({
    body: object({
        title: string({
            required_error: "Title is required!",
        }).min(6, "Title too short - should be at least 6 characters minimum!"),
        description: string({
            required_error: "Description is required!",
        }),
        //priority: number({}),
        complete: string({
            required_error: "Complete is required!",
        }),
    }),
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;