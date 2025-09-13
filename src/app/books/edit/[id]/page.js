"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { useUpdate } from "@/hooks/useUpdate";

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    publisherId: "",
    isbn: "",
    publicationYear: "",
    categoryId: "",
    description: "",
    quantity: 1,
    availableQuantity: 1,
    location: "",
  });

  // Fetch book detail
  const {
    data: book,
    loading: bookLoading,
    error: bookError,
  } = useFetch(`/api/books/${id}`);

  // Fetch dropdown data
  const { data: authors } = useFetch("/api/authors");
  const { data: publishers } = useFetch("/api/publishers");
  const { data: categories } = useFetch("/api/categories");

  // Update hook
  const { updateData, loading: submitting } = useUpdate(`/api/books/${id}`);

  // Set form data setelah book berhasil di-fetch
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        authorId: book.authorId || "",
        publisherId: book.publisherId || "",
        isbn: book.isbn || "",
        publicationYear: book.publicationYear || "",
        categoryId: book.categoryId || "",
        description: book.description || "",
        quantity: book.quantity || 1,
        availableQuantity: book.availableQuantity || 1,
        location: book.location || "",
      });
    }
  }, [book]);

  // Menghandle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Menghandle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateData(formData);
      router.push("/books");
      router.refresh();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (bookLoading) return <div className="text-center p-8">Loading...</div>;
  if (bookError)
    return (
      <div className="text-center p-8 text-red-500">Error: {bookError}</div>
    );
  if (!formData) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Buku</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Judul Buku:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Penulis:</label>
          <select
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Penulis</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Penerbit:</label>
          <select
            name="publisherId"
            value={formData.publisherId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Penerbit</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Kategori:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Tahun Terbit:</label>
          <input
            type="number"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div>
          <label className="block mb-1">Jumlah Total:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Jumlah Tersedia:</label>
          <input
            type="number"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            required
            min="0"
            max={formData.quantity}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Lokasi Rak:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Deskripsi:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <Link
            href={`/books/${id}`}
            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
