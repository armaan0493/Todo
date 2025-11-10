import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import mongoose from "mongoose";

/**
 * GET /api/todos/:id
 * Retrieves a single todo by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid todo ID",
        },
        { status: 400 }
      );
    }
    
    const todo = await Todo.findById(id);
    
    if (!todo) {
      return NextResponse.json(
        {
          success: false,
          error: "Todo not found",
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: todo,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch todo",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/todos/:id
 * Updates a todo by ID
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid todo ID",
        },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedTodo) {
      return NextResponse.json(
        {
          success: false,
          error: "Todo not found",
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedTodo,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update todo",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/todos/:id
 * Deletes a todo by ID
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid todo ID",
        },
        { status: 400 }
      );
    }
    
    const deletedTodo = await Todo.findByIdAndDelete(id);
    
    if (!deletedTodo) {
      return NextResponse.json(
        {
          success: false,
          error: "Todo not found",
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete todo",
      },
      { status: 500 }
    );
  }
}