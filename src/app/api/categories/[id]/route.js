import { NextResponse } from "next/server";
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/services/categoryService";

export async function GET(request, { params }) {
  try {
    const category = await getCategoryById(parseInt((await params).id));
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error GET category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const category = await updateCategory(parseInt((await params).id), data);
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error PUT category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await deleteCategory(parseInt((await params).id));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error DELETE category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
