import { NextResponse } from "next/server";
import {
  getPublisherById,
  updatePublisher,
  deletePublisher,
} from "@/services/publisherService";

export async function GET(request, { params }) {
  try {
    const publisher = await getPublisherById(parseInt((await params).id));
    if (!publisher) {
      return NextResponse.json({ error: "Publisher not found" }, { status: 404 });
    }
    return NextResponse.json(publisher);
  } catch (error) {
    console.error("Error GET publisher:", error);
    return NextResponse.json(
      { error: "Failed to fetch publisher" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const publisher = await updatePublisher(parseInt((await params).id), data);
    return NextResponse.json(publisher);
  } catch (error) {
    console.error("Error PUT publisher:", error);
    return NextResponse.json(
      { error: "Failed to update publisher" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await deletePublisher(parseInt((await params).id));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error DELETE publisher:", error);
    return NextResponse.json(
      { error: "Failed to delete publisher" },
      { status: 500 }
    );
  }
}
