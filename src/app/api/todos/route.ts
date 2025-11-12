import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Todo from "@/models/Todo";

 

export async function GET () {
    try {
        await connectToDatabase();
        const todos = await Todo.find().sort({ createdAt: -1 });

        return NextResponse.json({
        success: true,
        data: todos,
    });
}  catch (error: any) {
    return NextResponse.json(
        {
            success: false,
            error: error.message || "Failed to fetch todos",
        },
        { status: 500 }
    );
}
}

export async function POST (request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const {title, dueDate} = body;

        if (!body.title || body.title.trim() === "") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Title is required",
                },
                { status: 400 }
            );
        }

        const newTodo = await Todo.create({
            title: body.title.trim(),
            dueDate: body.dueDate,
            completed: body.completed || false,
});

        return NextResponse.json(
            {
                success: true,
                data: newTodo,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to create todo",
            },
            { status: 500 }
        );
    }
}
