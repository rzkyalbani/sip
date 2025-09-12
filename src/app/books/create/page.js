"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    publisherId: "",
    isbn: "",
    publicationYear: "",
    categoryId: "",
    description: "",
    quantity: 1,
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Mengambil data untuk dropdown
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [authorsRes, publishersRes, categoriesRes] = await Promise.all([
          fetch("/api/authors"),
          fetch("/api/publishers"),
          fetch("/api/categories"),
        ]);

        const authorsData = await authorsRes.json();
        const publishersData = await publishersRes.json();
        const categoriesData = await categoriesRes.json();

        setAuthors(authorsData);
        setPublishers(publishersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

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
    setLoading(true);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan buku");
      }

      router.push("/books");
      router.refresh();
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tambah Buku Baru</h1>

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
          <label className="block mb-1">Jumlah:</label>
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
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <Link
            href="/books"
            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
