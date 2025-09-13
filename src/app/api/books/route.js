import { createBook, getBooks } from "@/services/bookService";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const books = await getBooks({ search, categoryId, page, limit });

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
