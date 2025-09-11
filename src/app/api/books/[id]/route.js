import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fungsi untuk mendapatkan detail satu buku (GET)
export async function GET(request, { params }) {
  try {
    // Ambil ID dari parameter URL
    const id = parseInt(params.id);
    
    // Cari buku berdasarkan ID
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        publisher: true,
        category: true,
      },
    });
    
    // Jika buku tidak ditemukan
    if (!book) {
      return NextResponse.json(
        { error: 'Buku tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Kembalikan data buku
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error mengambil detail buku:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail buku' },
      { status: 500 }
    );
  }
}

// Fungsi untuk mengupdate buku (PUT)
export async function PUT(request, { params }) {
  try {
    // Ambil ID dari parameter URL
    const id = parseInt(params.id);
    
    // Ambil data dari body request
    const data = await request.json();
    
    // Perbarui data buku
    const book = await prisma.book.update({
      where: { id },
      data: {
        title: data.title,
        authorId: parseInt(data.authorId),
        publisherId: parseInt(data.publisherId),
        isbn: data.isbn,
        publicationYear: data.publicationYear ? parseInt(data.publicationYear) : null,
        categoryId: parseInt(data.categoryId),
        description: data.description,
        quantity: parseInt(data.quantity) || 1,
        availableQuantity: parseInt(data.availableQuantity) || 1,
        location: data.location,
      },
    });
    
    // Kembalikan data buku yang diperbarui
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error mengupdate buku:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate buku' },
      { status: 500 }
    );
  }
}

// Fungsi untuk menghapus buku (DELETE)
export async function DELETE(request, { params }) {
  try {
    // Ambil ID dari parameter URL
    const id = parseInt(params.id);
    
    // Hapus buku dari database
    await prisma.book.delete({
      where: { id },
    });
    
    // Kembalikan respons kosong dengan status 204 (No Content)
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error menghapus buku:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus buku' },
      { status: 500 }
    );
  }
}