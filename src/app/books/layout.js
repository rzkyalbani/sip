export default function BooksLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-xl font-semibold">
            Sistem Manajemen Perpustakaan
          </h1>
        </div>
      </header>

      <main className="py-6">{children}</main>
    </div>
  );
}
