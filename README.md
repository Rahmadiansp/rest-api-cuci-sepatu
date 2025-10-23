# REST API Daftar Barang Cuci Sepatu

Proyek ini merupakan tugas responsi Modul 1 Praktikum PPB untuk membuat REST API sederhana menggunakan Node.js dan Express.js yang berfungsi untuk mengelola data sepatu yang sedang dicuci.

## Deskripsi Umum

API ini dibuat untuk mempermudah proses pencatatan, pemantauan, dan pembaruan status cucian sepatu secara digital. API mendukung operasi CRUD (Create, Read, Update, Delete) lengkap dengan fitur filter berdasarkan status.

## Tujuan

1. Mengimplementasikan konsep CRUD dalam REST API
2. Meningkatkan pemahaman penggunaan Express.js sebagai framework backend
3. Mengelola data menggunakan Supabase sebagai database
4. Membangun sistem pencatatan yang relevan dengan kebutuhan bisnis nyata

## Teknologi yang Digunakan

- **Node.js** - Runtime environment untuk JavaScript
- **Express.js** - Framework backend untuk REST API
- **Supabase** - Database PostgreSQL cloud
- **Vercel** - Platform deployment

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/Rahmadiansp/rest-api-cuci-sepatu.git
cd rest-api-cuci-sepatu
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` dan isi dengan kredensial Supabase Anda:

```env
SUPABASE_URL=https://hvmbmyhajxjikrajnkzb.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bWJteWhhanhqaWtyYWpua3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMDE3NzIsImV4cCI6MjA3Njc3Nzc3Mn0.ZALNgYnrYRzpdz27roTFrYESI10rGshQjOvQoTNIH-c
PORT=3000
NODE_ENV=development
```

### 4. Setup Database Supabase

Jalankan query SQL berikut di Supabase SQL Editor:

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'Sedang Dicuci',
  tanggal_masuk DATE NOT NULL,
  tanggal_selesai DATE
);
```

### 5. Jalankan Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. GET / - Root Endpoint
Menampilkan informasi API dan daftar endpoint.

**Response:**
```json
{
  "message": "Selamat datang di API Cuci Sepatu",
  "endpoints": {
    "GET /items": "Menampilkan semua data sepatu",
    "GET /items?status=Selesai": "Filter berdasarkan status",
    "POST /items": "Menambah data sepatu baru",
    "PUT /items/:id": "Update status sepatu",
    "DELETE /items/:id": "Hapus data sepatu"
  }
}
```

### 2. GET /items - Menampilkan Semua Data

**Request:**
```
GET /items
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "nama": "Nike Air Force 1",
      "status": "Sedang Dicuci",
      "tanggal_masuk": "2025-10-08",
      "tanggal_selesai": null
    },
    {
      "id": 2,
      "nama": "Converse Chuck Taylor",
      "status": "Selesai",
      "tanggal_masuk": "2025-10-01",
      "tanggal_selesai": "2025-10-03"
    }
  ]
}
```

### 3. GET /items?status=Selesai - Filter Berdasarkan Status

**Request:**
```
GET /items?status=Selesai
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 2,
      "nama": "Converse Chuck Taylor",
      "status": "Selesai",
      "tanggal_masuk": "2025-10-01",
      "tanggal_selesai": "2025-10-03"
    }
  ]
}
```

### 4. GET /items/:id - Menampilkan Data Berdasarkan ID

**Request:**
```
GET /items/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Sedang Dicuci",
    "tanggal_masuk": "2025-10-08",
    "tanggal_selesai": null
  }
}
```

### 5. POST /items - Menambahkan Data Baru

**Request:**
```
POST /items
Content-Type: application/json

{
  "nama": "Nike Air Max",
  "status": "Sedang Dicuci",
  "tanggal_masuk": "2025-10-23"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil ditambahkan",
  "data": {
    "id": 3,
    "nama": "Nike Air Max",
    "status": "Sedang Dicuci",
    "tanggal_masuk": "2025-10-23",
    "tanggal_selesai": null
  }
}
```

### 6. PUT /items/:id - Update Data Sepatu

**Request:**
```
PUT /items/1
Content-Type: application/json

{
  "status": "Selesai",
  "tanggal_selesai": "2025-10-24"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Status sepatu berhasil diperbarui",
  "data": {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Selesai",
    "tanggal_masuk": "2025-10-08",
    "tanggal_selesai": "2025-10-24"
  }
}
```

### 7. DELETE /items/:id - Hapus Data Sepatu

**Request:**
```
DELETE /items/1
```

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil dihapus"
}
```

## Struktur Data

| Field | Type | Deskripsi |
|-------|------|-----------|
| id | Integer | ID unik sepatu (auto-increment) |
| nama | String | Nama/merek sepatu |
| status | String | Status cucian (Sedang Dicuci / Selesai) |
| tanggal_masuk | Date | Tanggal sepatu masuk |
| tanggal_selesai | Date | Tanggal sepatu selesai (nullable) |

## Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Rahmadiansp/rest-api-cuci-sepatu.git
git push -u origin main
```

### 2. Deploy via Vercel Dashboard

1. Login ke [Vercel](https://vercel.com)
2. Import repository dari GitHub
3. Tambahkan environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `NODE_ENV=production`
4. Klik Deploy

## Testing

### Menggunakan Thunder Client (VS Code Extension)

1. Install extension Thunder Client
2. Buat request baru
3. Test semua endpoint (GET, POST, PUT, DELETE)

### Menggunakan cURL

```bash
# GET semua data
curl http://localhost:3000/items

# POST data baru
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"nama":"Adidas Superstar","tanggal_masuk":"2025-10-23"}'

# PUT update status
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Selesai","tanggal_selesai":"2025-10-24"}'

# DELETE data
curl -X DELETE http://localhost:3000/items/1
```

## Struktur Project

```
rest-api-cuci-sepatu/
├── index.js           # File utama API
├── package.json       # Dependencies
├── vercel.json        # Konfigurasi Vercel
├── .env              # Environment variables (tidak di-commit)
├── .gitignore        # File yang diabaikan Git
└── README.md         # Dokumentasi
```

## Keamanan

- Jangan commit file `.env` ke repository
- Gunakan environment variables untuk data sensitif
- Validasi input dari user
- Implementasi rate limiting untuk production

## Error Handling

API mengembalikan error response dengan format:

```json
{
  "success": false,
  "message": "Pesan error",
  "error": "Detail error"
}
```
## Author

Rahmadian Setyo Purnomo - Responsi Modul 1 PPB

## Links

- **Repository GitHub**: https://github.com/Rahmadiansp/rest-api-cuci-sepatu
