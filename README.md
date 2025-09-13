# SIP - Sistem Informasi Perpustakaan

Sistem Informasi Perpustakaan (SIP) adalah aplikasi web modern yang dibangun untuk mengelola operasi perpustakaan secara digital. Aplikasi ini menyediakan fitur-fitur lengkap untuk manajemen buku, anggota, dan transaksi peminjaman.

## 🚀 Teknologi yang Digunakan

- **Next.js 15** - Framework React untuk pengembangan web
- **React 19** - Library JavaScript untuk membangun user interface
- **Prisma** - ORM modern untuk database
- **Tailwind CSS** - Framework CSS untuk styling
- **bcrypt** - Library untuk hashing password
- **TypeScript** - Superset JavaScript dengan type safety

## 📋 Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstall:

- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- Database (PostgreSQL/MySQL/SQLite)

## 🛠️ Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/rzkyalbani/sip.git
cd sip
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root directory dan tambahkan konfigurasi database:

```env
DATABASE_URL="your_database_connection_string"  # e.g DATABASE_URL="mysql://root@localhost:3306/library_db"
NEXTAUTH_SECRET="your_secret_key"               # e.g 4f3f9d2b3e1a7c8d9b0f1e2d3c4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2
```

### 4. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Jalankan migrasi database
npx prisma db push

# (Opsional) Seed database dengan data awal
npm run db:seed                                # Tambahkan "db:seed": "npx ts-node prisma/seed.ts" di "scripts" package.json 
```

### 5. Menjalankan Development Server

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### 6. Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Project

```
sip/
├── prisma/          # Database schema dan migrations
├── public/          # Static assets
├── src/             # Source code aplikasi
├── package.json     # Dependencies dan scripts
└── README.md        # Dokumentasi project
```

## 🔧 Scripts yang Tersedia

- `npm run dev` - Menjalankan development server dengan Turbopack
- `npm run build` - Build aplikasi untuk production
- `npm run start` - Menjalankan production server
- `npm run db:seed` - Mengisi database dengan data awal
