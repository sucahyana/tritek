
---

# SISTEM INFORMASI PENANGANAN MONITORING PRODUKSI BERBASIS WEBSITE DI PT. TRITEK INDONESIA

Sebuah aplikasi berbasis web yang dikembangkan oleh PT Tritek Indonesia untuk memantau dan mengelola proses produksi secara efektif. Aplikasi ini dibangun menggunakan framework Laravel untuk backend dan React untuk frontend.

## Daftar Isi
- [Pendahuluan](#introduction)
- [Fitur-fitur](#features)
- [Screenshots](#screenshots)
- [Video Demo](#demo-video)
- [Instalasi](#installation)
- [Penggunaan](#usage)
- [Dependencies](#dependencies)
- [Konfigurasi](#configuration)
- [Dokumentasi](#documentation)
- [Contoh Penggunaan API](#examples)
- [Permasalahan Umum](#troubleshooting)
- [Kontributor](#contributors)
- [Lisensi](#license)

## Pendahuluan
Aplikasi Monitoring Produksi dirancang untuk membantu PT Tritek Indonesia dalam memantau dan mengelola proses produksi secara real-time. Dengan menggunakan aplikasi ini, pengguna dapat melacak status produksi, mengevaluasi efisiensi, dan mengidentifikasi potensi masalah sebelum menjadi isu besar.

## Fitur-fitur
- Pemantauan produksi real-time
- Antarmuka yang ramah pengguna
- Pelaporan dan analisis terperinci
- Sistem notifikasi untuk peringatan dan pembaruan
- Kontrol akses berbasis peran

## Screenshots
### Dashboard '/'
![Dashboard](/assets/dashboard.png)
Menampilkan data thumbnail produk dan material dengan fitur pencarian dan paginasi.

### Produk Thumbnail '/products'
![Produk Thumbnail](/assets/productThumbnail.png)
Menampilkan thumbnail produk dengan fitur paginasi dan tambah produk baru.

### Detail Produk '/product/{model}'
![Detail Produk](/assets/productDetail.png)
Menampilkan detail produk dengan fitur pengelolaan dan edit.

### Pengaturan Produk '/product/{model}/setting'
![Pengaturan Produk](/assets/productSetting.png)
Menampilkan pengaturan produk dengan fitur tambah, edit, dan hapus.

## Video Demo
*(Tambahkan video demo dari aplikasi di sini)*

[![Demo Video](path/to/video_thumbnail.png)](path/to/demo_video.mp4)

## Instalasi
### Prasyarat
- PHP >= 7.3
- Node.js >= 12.x
- Composer
- NPM atau Yarn
- MySQL

### Langkah-langkah
1. Clone repository:
   ```sh
   git clone https://github.com/sucahyana/tritek.git
   cd tritek
   ```

2. Instal dependensi backend menggunakan Composer:
   ```sh
   composer install
   ```

3. Instal dependensi frontend menggunakan NPM atau Yarn:
   ```sh
   npm install
   # atau
   yarn install
   ```

4. Salin file `.env.example` menjadi `.env` dan konfigurasikan variabel lingkungan:
   ```sh
   cp .env.example .env
   ```

5. Generate aplikasi key:
   ```sh
   php artisan key:generate
   ```

6. Jalankan migrasi database:
   ```sh
   php artisan migrate
   ```

7. Bangun aset frontend:
   ```sh
   npm run dev
   # atau
   yarn dev
   ```

8. Jalankan server pengembangan:
   ```sh
   php artisan serve
   ```

## Penggunaan
1. Akses aplikasi melalui browser di `http://localhost:8000`.
2. Login menggunakan akun yang sudah terdaftar.
3. Navigasi melalui dashboard untuk memantau status produksi dan mendapatkan laporan.

## Dependencies
- **Backend**: Laravel
- **Frontend**: React, Redux
- **Database**: MySQL
- **Library Lain**:
  - Axios
  - React Router
  - Chart.js

## Konfigurasi
Konfigurasi aplikasi dilakukan melalui file `.env`. Berikut beberapa konfigurasi penting:
- **Database**:
  ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=nama_database
  DB_USERNAME=username
  DB_PASSWORD=password
  ```
- **Mail**:
  ```env
  MAIL_MAILER=smtp
  MAIL_HOST=smtp.example.com
  MAIL_PORT=587
  MAIL_USERNAME=your_email@example.com
  MAIL_PASSWORD=your_email_password
  MAIL_ENCRYPTION=tls
  ```

## Dokumentasi
Dokumentasi lengkap aplikasi dapat ditemukan di folder `docs` pada repository ini.

## Contoh Penggunaan API
Berikut adalah beberapa contoh penggunaan API dari aplikasi ini:
- Mendapatkan daftar produksi:
  ```sh
  GET /api/productions
  ```
- Menambahkan produksi baru:
  ```sh
  POST /api/productions
  {
      "name": "Produk Baru",
      "status": "In Progress"
  }
  ```

## Permasalahan Umum
- **Masalah koneksi database**: Pastikan konfigurasi database di file `.env` sudah benar.
- **Error saat migrasi**: Periksa struktur database dan pastikan tidak ada tabel yang bertabrakan.
- **Masalah dependensi**: Jalankan `composer install` dan `npm install` untuk memastikan semua dependensi terinstal dengan benar.

## Kontributor
- [Nama Anda](https://github.com/username) - Pengembang Utama
- [Nama Kontributor Lain](https://github.com/username2) - Pengembang Backend
- [Nama Kontributor Lain](https://github.com/username3) - Pengembang Frontend

## Lisensi
Aplikasi ini dilisensikan di bawah [MIT License](LICENSE).

---

