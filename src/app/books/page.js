"use client";

import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";

export default function BooksPage() {
  const { data: books, loading, error } = useFetch("/api/books");

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Buku</h1>
        <Link
          href="/books/create"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Tambah Buku
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-center p-8">Belum ada buku yang tersedia.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Judul</th>
              <th className="py-2 px-4 text-left">Penulis</th>
              <th className="py-2 px-4 text-left">Penerbit</th>
              <th className="py-2 px-4 text-left">Kategori</th>
              <th className="py-2 px-4 text-left">Ketersediaan</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="py-2 px-4">{book.title}</td>
                <td className="py-2 px-4">{book.author?.name || "-"}</td>
                <td className="py-2 px-4">{book.publisher?.name || "-"}</td>
                <td className="py-2 px-4">{book.category?.name || "-"}</td>
                <td className="py-2 px-4">
                  {book.availableQuantity}/{book.quantity}
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <Link
                      href={`/books/${book.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Detail
                    </Link>
                    <Link
                      href={`/books/edit/${book.id}`}
                      className="text-green-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-500 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
