import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fungsi untuk mendapatkan semua buku (GET)
export async function GET() {
  try {
    // Ambil semua data buku dari database
    const books = await prisma.book.findMany({
      include: {
        author: true, // Sertakan data penulis
        publisher: true, // Sertakan data penerbit
        category: true, // Sertakan data kategori
      },
    });

    // Kembalikan data buku dalam format JSON
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error mengambil data buku:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data buku" },
      { status: 500 }
    );
  }
}

// Fungsi untuk menambahkan buku baru (POST)
export async function POST(request) {
  try {
    // Ambil data dari body request
    const data = await request.json();

    // Simpan buku baru ke database
    const book = await prisma.book.create({
      data: {
        title: data.title,
        authorId: parseInt(data.authorId),
        publisherId: parseInt(data.publisherId),
        isbn: data.isbn,
        publicationYear: data.publicationYear
          ? parseInt(data.publicationYear)
          : null,
        categoryId: parseInt(data.categoryId),
        description: data.description,
        quantity: parseInt(data.quantity) || 1,
        availableQuantity: parseInt(data.quantity) || 1,
        location: data.location,
      },
    });

    // Kembalikan data buku yang baru dibuat
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error membuat buku:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan buku baru" },
      { status: 500 }
    );
  }
}
