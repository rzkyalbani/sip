import { createPublisher, getPublishers } from "@/services/publisherService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const publishers = await getPublishers();
    return NextResponse.json(publishers);
  } catch (error) {
    console.error("Error GET publishers:", error);
    return NextResponse.json(
      { error: "Failed to fetch publishers" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const publisher = await createPublisher(data);
    return NextResponse.json(publisher, { status: 201 });
  } catch (error) {
    console.error("Error POST publisher:", error);
    return NextResponse.json(
      { error: "Failed to create publisher" },
      { status: 500 }
    );
  }
}
