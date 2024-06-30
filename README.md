
---

# SISTEM INFORMASI PENANGANAN MONITORING PRODUKSI BERBASIS WEBSITE DI PT. TRITEK INDONESIA

Sebuah aplikasi berbasis web yang dikembangkan oleh PT Tritek Indonesia untuk memantau dan mengelola proses produksi secara efektif. Aplikasi ini dibangun menggunakan framework Laravel untuk backend dan React untuk frontend.

## Daftar Isi
- [Pendahuluan](#pendahuluan)
- [Fitur-fitur](#fitur-fitur)
- [Screenshots](#screenshots)
- [Video Demo](#video-demo)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Dependencies](#dependencies)
- [Konfigurasi](#konfigurasi)
- [Dokumentasi](#dokumentasi)
- [Contoh Penggunaan API](#contoh-penggunaan-api)
- [Permasalahan Umum](#permasalahan-umum)
- [Kontributor](#kontributor)
- [Lisensi](#lisensi)

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
![Produk Thumbnail](/assets/products.png)
Menampilkan thumbnail produk dengan fitur paginasi dan tambah produk baru.

### Detail Produk '/product/{model}'
[![Product Detail](/assets/productDetail.png)](/assets/productDetail.mp4)


https://github.com/sucahyana/tritek/assets/97436856/353c2844-7c9f-4a0f-8288-adaa75702b6d



Menampilkan detail produk dengan fitur pengelolaan dan edit.


### Pengaturan Produk '/product/{model}/setting'
[![Product setting](/assets/productSetting.png)](/assets/productSetting.mp4)

<<<<<<< HEAD
=======

https://github.com/sucahyana/tritek/assets/97436856/09589a2d-d933-4249-987b-cdb5e153fe60


Menampilkan pengaturan produk dengan fitur tambah, edit, dan hapus.

>>>>>>> ef8ab9f773295d815d8d8887be31f5a063eae820
### Material Thumbnail '/materials'
![Material](/assets/materials.png)
Menampilkan thumbnail material dengan fitur paginasi dan tambah material baru.

### Detail Material'/material/{model}'
[![Material Detail](/assets/productDetail.png)](/assets/materialDetail.mp4)



https://github.com/sucahyana/tritek/assets/97436856/cb52962f-1d1a-456c-86e4-113049ab8607



Menampilkan detail produk dengan fitur pengelolaan dan edit.


### Pengaturan Material '/material/{model}/setting'
[![material setting](/assets/materialSetting.png)](/assets/materialSetting.mp4)
Menampilkan pengaturan material dengan fitur tambah, edit, dan hapus.

## Instalasi
### Prasyarat
- PHP >= 8.2
- Node.js >= v18.13.0
- Composer
- NPM atau Yarn atau pnpm
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
  - **React :
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@mui/material": "^5.15.19",
    "@mui/styled-engine-sc": "6.0.0-alpha.18",
    "@mui/system": "^5.15.20",
    "@mui/x-charts": "^7.6.1",
    "@react-pdf/renderer": "^3.4.4",
    "@reduxjs/toolkit": "^2.2.5",
    "axios": "^1.6.8",
    "date-fns": "^3.6.0",
    "docx": "^8.5.0",
    "file-saver": "^2.0.5",
    "framer-motion": "^11.2.11",
    "jspdf": "^2.5.1",
    "primeicons": "^7.0.0",
    "primereact": "^10.6.5",
    "react": "^18.2.0",
    "react-dom": "^18.3.1",
    "react-full-screen": "^1.1.1",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.2.1",
    "react-pdf": "^9.0.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.23.1",
    "react-youtube": "^10.1.0",
    "recharts": "^2.12.7",
    "redux": "^5.0.1",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^3.1.0",
    "styled-components": "^6.1.11",
    "xlsx": "^0.18.5",
    "@react-buddy/ide-toolbox": "^2.4.0",
    "@react-buddy/palette-mui": "^5.0.1"
  - **Laravel
    "php-units-of-measure/php-units-of-measure": "^2.1"
    "maatwebsite/excel": "^3.1",
    "barryvdh/laravel-dompdf": "^2.2",
    "laravel/telescope": "^5.0",
    "mockery/mockery": "^1.6",
    "nunomaduro/collision": "^8.0",
    "phpunit/phpunit": "^11.0.1",
    "reliese/laravel": "^1.3",
    "spatie/laravel-ignition": "^2.4"

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
- [Sud Ulam cahyana](https://github.com/sucahyana) - Pengembang Tunggal Front End,Back End
- [Muhammad Akbar] ([https://github.com/akbar](https://github.com/Akbaroke)) - Pemecah Kebosanan (Valorant teamate)

## Lisensi
Aplikasi ini dilisensikan di bawah [MIT License](LICENSE).

---