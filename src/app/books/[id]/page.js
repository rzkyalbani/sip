"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

export default function BookDetailPage() {
  const { id } = useParams();
  const { data: book, loading, error } = useFetch(`/api/books/${id}`);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center min-h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Memuat detail buku...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Terjadi Kesalahan
          </h3>
          <p className="text-red-600">{error}</p>
          <Link
            href="/books"
            className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Kembali ke Daftar Buku
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Buku Tidak Ditemukan
          </h3>
          <p className="text-gray-500 mb-6">
            Buku yang Anda cari tidak ada dalam sistem.
          </p>
          <Link
            href="/books"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Buku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {book.author?.name || "Tidak diketahui"}
                  </span>
                  <span>•</span>
                  <span>{book.publicationYear || "Tahun tidak diketahui"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/books/edit/${book.id}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Buku
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Informasi Buku
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    Penulis
                  </span>
                  <span className="text-sm text-gray-900 flex-1">
                    {book.author?.name || "-"}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    Penerbit
                  </span>
                  <span className="text-sm text-gray-900 flex-1">
                    {book.publisher?.name || "-"}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    Kategori
                  </span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    {book.category?.name || "-"}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    ISBN
                  </span>
                  <span className="text-sm text-gray-900 flex-1 font-mono">
                    {book.isbn || "-"}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    Tahun
                  </span>
                  <span className="text-sm text-gray-900 flex-1">
                    {book.publicationYear || "-"}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    Lokasi
                  </span>
                  <span className="text-sm text-gray-900 flex-1">
                    {book.location || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Deskripsi
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {book.description || "Tidak ada deskripsi untuk buku ini."}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Availability Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Status Ketersediaan
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Buku</span>
                <span className="text-lg font-semibold text-gray-900">
                  {book.quantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tersedia</span>
                <span
                  className={`text-lg font-semibold ${
                    book.availableQuantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {book.availableQuantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dipinjam</span>
                <span className="text-lg font-semibold text-orange-600">
                  {book.quantity - book.availableQuantity}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="pt-4 border-t">
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    book.availableQuantity > 0
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      book.availableQuantity > 0 ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">
                    {book.availableQuantity > 0
                      ? "Tersedia untuk dipinjam"
                      : "Sedang tidak tersedia"}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Ketersediaan</span>
                  <span>
                    {Math.round((book.availableQuantity / book.quantity) * 100)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      book.availableQuantity > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: `${
                        (book.availableQuantity / book.quantity) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Aksi Cepat
            </h3>
            <div className="space-y-3">
              <Link
                href={`/books/edit/${book.id}`}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Informasi Buku
              </Link>
              <Link
                href="/books"
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Lihat Semua Buku
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
