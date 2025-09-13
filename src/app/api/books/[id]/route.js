import { NextResponse } from "next/server";
import { getBookById, updateBook, deleteBook } from "@/services/bookService";

export async function GET(request, { params }) {
  try {
    const book = await getBookById(parseInt(parseInt((await params).id)));
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error("Error GET book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const book = await updateBook(parseInt(params.id), data);
    return NextResponse.json(book);
  } catch (error) {
    console.error("Error PUT book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await deleteBook(parseInt(params.id));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error DELETE book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
