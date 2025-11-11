import mongoose, {Schema, model, models} from "mongoose";

export interface ITodo {
    title: string;
    completed?: boolean;
    createdAt?: Date;
    updatedAt?: Date; 
}

const TodoSchema = new Schema <ITodo>(
    {
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [200, "Title must be less than 200 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
}
);
// Prevent model overwrite upon initial compile

const Todo = models.Todo || model<ITodo>("Todo", TodoSchema);

export default Todo;