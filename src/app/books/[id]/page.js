"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);

        if (!response.ok) {
          throw new Error("Buku tidak ditemukan");
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  if (!book) {
    return <div className="text-center p-8">Buku tidak ditemukan</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <div className="flex space-x-2">
          <Link
            href={`/books/edit/${book.id}`}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Edit
          </Link>
          <Link
            href="/books"
            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
          >
            Kembali
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Informasi Buku</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Penulis:</span>{" "}
                {book.author?.name || "-"}
              </p>
              <p>
                <span className="font-semibold">Penerbit:</span>{" "}
                {book.publisher?.name || "-"}
              </p>
              <p>
                <span className="font-semibold">Kategori:</span>{" "}
                {book.category?.name || "-"}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {book.isbn || "-"}
              </p>
              <p>
                <span className="font-semibold">Tahun Terbit:</span>{" "}
                {book.publicationYear || "-"}
              </p>
              <p>
                <span className="font-semibold">Lokasi:</span>{" "}
                {book.location || "-"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Ketersediaan:</span>
                <span
                  className={`ml-2 ${
                    book.availableQuantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {book.availableQuantity} dari {book.quantity}
                </span>
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Deskripsi</h2>
            <p className="text-gray-700">
              {book.description || "Tidak ada deskripsi"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
