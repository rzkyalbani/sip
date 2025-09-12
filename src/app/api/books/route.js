import { createBook, getBooks } from "@/services/bookService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const books = await getBooks();
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error GET books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const book = await createBook(data);
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error POST book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
