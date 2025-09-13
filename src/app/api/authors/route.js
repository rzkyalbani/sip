import { NextResponse } from "next/server";
import { getAuthors, createAuthor } from "@/services/authorService";

export async function GET() {
  try {
    const authors = await getAuthors();
    return NextResponse.json(authors);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const author = await createAuthor(data);
    return NextResponse.json(author, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}
