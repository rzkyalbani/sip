import { NextResponse } from "next/server";
import {
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "@/services/authorService";

export async function GET(req, { params }) {
  try {
    const author = await getAuthorById(parseInt((await params).id));
    if (!author)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(author);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch author" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const author = await updateAuthor(parseInt((await params).id), data);
    return NextResponse.json(author);
  } catch {
    return NextResponse.json(
      { error: "Failed to update author" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await deleteAuthor(parseInt((await params).id));
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 }
    );
  }
}
