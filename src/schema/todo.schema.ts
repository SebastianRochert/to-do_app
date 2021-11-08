import {number, object, string, TypeOf} from "zod";

export const createTodoSchema = object({
    body: object({
        title: string({
            required_error: "Title is required!",
        }).min(6, "Title too short - should be at least 6 characters minimum!"),
        description: string({
            required_error: "Description is required!",
        }),
        priority: number({
            required_error: "Priority is required!",
        }),
        complete: string({
            required_error: "Complete is required!",
        }),
    }),
});

const params = {
    params: object({
        title: string({
            required_error: "Title is required!"
        })
    })
};

export const deleteTodoSchema = object({
    ...params
});

export type DeleteTodoInput = TypeOf<typeof deleteTodoSchema>;

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;

