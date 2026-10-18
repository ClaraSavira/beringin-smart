# SIPRA Mobile — Sistem Informasi Pengaduan Sarpras

> Aplikasi Pelaporan dan Monitoring Sarana Prasarana Sekolah berbasis Mobile (Ionic React) & RESTful API (Laravel 12 + Laravel Sanctum), dikembangkan sesuai Standar Kompetensi Kerja Nasional Indonesia (**SKKNI No. 282 Tahun 2016**).

---

## 🌟 Gambaran Singkat Proyek

**SIPRA Mobile** dirancang untuk mendigitalisasi proses pengaduan kerusakan infrastruktur sekolah di lingkungan **SMK Negeri 1 Beringin**. Melalui aplikasi ini, siswa dapat dengan cepat mengirimkan tiket pengaduan kerusakan fasilitas belajar (kelas, laboratorium, sarana umum), sementara tim Sarana dan Prasarana (Sarpras) dapat memverifikasi serta memperbarui status tindak lanjut secara langsung dari genggaman.

---

## 🛠️ Stack Teknologi

| Komponen | Framework / Library | Fungsi Utama |
|:---|:---|:---|
| **Frontend Mobile** | Ionic Framework v8 + React 19 + TypeScript | Antarmuka mobile-first responsive dengan arsitektur SPA |
| **Build Tooling** | Vite 8 + CSS Variables Custom Theme | Kompilasi ultra-cepat dan bundle CSS modular |
| **State & HTTP** | React Context API + Axios | Manajemen data aplikasi dan interceptor Bearer Token |
| **Backend REST API**| Laravel 12 + PHP 8.3 | Logika bisnis, validasi request, dan role authorization |
| **Sistem Keamanan** | Laravel Sanctum | Autentikasi berbasis Token JWT / Personal Access Tokens |
| **Database** | MySQL (Stack Laragon) / SQLite | Penyimpanan relasional data pengguna dan tiket laporan |

---

## 📁 Struktur Berkas Proyek

```text
D:/Clara/
├── Beringin-Smart/               # Repositori Aplikasi Frontend (Ionic React)
│   ├── src/
│   │   ├── pages/                # Login.tsx, Home.tsx, Detail.tsx
│   │   ├── context/              # LaporanContext.tsx (Consumer API)
│   │   ├── services/             # api.ts (Axios Instance & Interceptor)
│   │   └── theme/                # variables.css (Electric Violet Palette)
│   ├── index.html
│   └── package.json
│
├── beringin-backend/             # Repositori Layanan Backend (Laravel API)
│   ├── app/
│   │   ├── Http/Controllers/     # AuthController.php, LaporanController.php
│   │   └── Models/               # User.php, Laporan.php
│   ├── database/                 # Migrasi & DatabaseSeeder.php
│   ├── routes/api.php            # Deklarasi Endpoint Publik & Proteksi Sanctum
│   └── config/cors.php           # Pengaturan Cross-Origin Resource Sharing
│
└── README.md                     # Dokumentasi Resmi Proyek
```

---

## ⚡ Panduan Instalasi & Eksekusi Cepat

### 1. Inisialisasi Backend Server (Laravel)
```bash
# Pindah ke direktori backend
cd beringin-backend

# Jalankan migrasi dan isi data awal pengujian (Seeder)
php artisan migrate:fresh --seed

# Hidupkan server API lokal
php artisan serve
```
*Server REST API akan aktif di alamat:* `http://localhost:8000/api`

### 2. Inisialisasi Frontend Mobile (Ionic React)
```bash
# Buka jendela terminal baru lalu masuk ke direktori frontend
cd Beringin-Smart

# Jalankan server pengembangan Vite
npm run dev
```
*Aplikasi mobile siap diakses melalui peramban web di:* `http://localhost:5173` atau `http://localhost:8100`

---

## 📡 Dokumentasi Endpoint REST API

### 🔓 Rute Publik
- `POST /api/login` : Autentikasi kredensial pengguna dan mengembalikan Sanctum Bearer Token.
- `GET /api/laporan` : Mendapatkan seluruh daftar riwayat pengaduan fasilitas.
- `POST /api/laporan` : Mengirim tiket pengaduan baru dari pelapor (siswa).

### 🔒 Rute Terproteksi (`auth:sanctum`)
- `POST /api/logout` : Menghapus token sesi aktif (*revoke token*).
- `GET /api/me` : Membaca profil pengguna yang sedang login.
- `PATCH /api/laporan/{id}/status` : Mengubah status penanganan menjadi 'Selesai'.  
  *(Hanya diizinkan untuk akun dengan peran `petugas`. Permintaan tanpa hak akses ditolak dengan respon **HTTP 403 Forbidden**)*.

---

## 👥 Akun Uji Coba (Kredensial Default)

| Tipe Akun | Alamat Surel | Kata Sandi | Otoritas / Peran |
|:---|:---|:---|:---|
| **Siswa** | `siswa@beringin.sch.id` | `password123` | Mengisi tiket pengaduan, melihat status tiket terkini. |
| **Petugas Sarpras** | `petugas@beringin.sch.id` | `password123` | Melihat seluruh tiket, memiliki wewenang menandai status 'Selesai'. |

---

## 👩‍💻 Tim Pengembang

- **Nama Pengembang** : Clara Savira
- **Konsentrasi Keahlian** : Pengembangan Perangkat Lunak dan Gim (PPLG)
- **Institusi** : SMK Negeri 1 Beringin
- **Surel** : `clarasavira784@gmail.com`
- **GitHub** : [@ClaraSavira](https://github.com/ClaraSavira)
