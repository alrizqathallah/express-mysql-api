# Express + MySQL REST API

Repositori ini merupakan proyek pembelajaran yang memfokuskan pada pengembangan Backend REST API menggunakan **ExpressJS** dan Database **MySQL**, dilengkapi dengan alat pengembangan serta linting modern.

Diharapkan repo ini dapat membantu siapapun diluar sana yang sedang mencari proyek pembelajaran aplikasi Backend bagi para pemula.

---

## Susunan Teknologi

| Kategori                  | Teknologi                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Runtime**/**Framework** | NodeJS (runtime service), `express` (server framework)                                                                                |
| **Database**              | MySQL (database), `mysql2` (library integration)                                                                                      |
| **Logging**               | `morgan` (http log), `winston` (app log)                                                                                              |
| **Development Tools**     | `nodemon` (server refresher), `eslint` (code policy), `prettier` (code formatter), `lint-staged` (git filteting), `husky` (git hooks) |
| **Config**                | `dotenv` (security: environment variable)                                                                                             |

---

## Prasyarat

- Harus dipastikan **NodeJS** (v18+) sudah terinstal secara lokal
- Harus sudah tersedia **MySQL** (v8+) yang siap digunakan
- **Git** untuk penunjang pengembangan

---

## Instalasi dan Konfigurasi

1. **Persiapan dan Inisialisasi Proyek**

   Langkah pertama adalah membuat direktori kerja untuk proyek Anda di komputer lokal, lalu masuk ke dalam direktori tersebut. Silakan jalankan perintah berikut di terminal:

   ```Bash
   mkdir express-mysql-api
   cd express-mysql-api
   ```

   Setelah direktori dibuat, buka folder tersebut menggunakan editor kode (IDE) andalan Anda (misalnya VS Code). Pada saat yang sama, siapkan sebuah repositori kosong di platform _version control_ berbasis cloud (seperti GitHub, GitLab, atau Bitbucket) untuk menyimpan basis kode Anda nantinya.

   Selanjutnya, inisialisasi repositori Git di dalam direktori lokal Anda agar sistem mulai melacak riwayat perubahan file:

   ```Bash
   git init
   ```

   Langkah terakhir pada tahap ini adalah menghubungkan direktori lokal Anda dengan repositori daring (remote) yang baru saja dibuat. Ganti `<url-repository>` dengan tautan dari platform cloud Anda:

   ```Bash
   git remote add origin <url-repository>
   ```

   Kini, proyek lokal dan repositori cloud Anda telah terintegrasi secara penuh dan siap untuk proses pengembangan lebih lanjut.

2. **Inisialisasi Lingkungan Node.js**

   Karena aplikasi ini dibangun di atas _runtime_ Node.js, langkah pertama adalah menginisialisasi proyek. Jalankan perintah berikut untuk membuat file `package.json` secara otomatis (melewati _prompt_ manual):

   ```bash
   npm init -y
   ```

   File `package.json` ini sangat krusial karena bertindak sebagai manifes proyek. File ini akan mencatat identitas aplikasi, skrip eksekusi (_scripts_), serta melacak seluruh versi pustaka (_library_) yang akan kita gunakan.

3. **Instalasi Dependensi (Dependencies & devDependencies)**

   Setelah file `package.json` terbentuk, tahap selanjutnya adalah menginstal pustaka utama (_dependencies_) yang menjadi fondasi berjalannya aplikasi di _server_:

   ```bash
   npm i express mysql2 dotenv morgan winston
   ```

   - `express`: _Framework_ utama untuk membangun REST API.

   - `mysql2`: _Driver_ database MySQL dengan performa tinggi dan dukungan _Promise_ (untuk fitur _Connection Pool_).

   - `dotenv`: Mengelola variabel lingkungan yang aman (membaca file `.env`).

   - `morgan` & `winston`: Sistem pencatatan aktivitas (_logging_) komprehensif untuk memantau lalu lintas HTTP dan status aplikasi.

   Selanjutnya, instal pustaka pendukung (_devDependencies_) yang hanya beroperasi selama fase pengembangan. Alat-alat ini akan sangat membantu dalam mempercepat penulisan kode dan menjaga standarisasi format:

   ```bash
   npm i -D nodemon eslint prettier eslint-config-prettier eslint-plugin-prettier @eslint/eslintrc @eslint/js globals
   ```

   - `nodemon`: Melakukan auto-reload server secara instan setiap kali ada perubahan pada kode.

   - `eslint` & `prettier` (**serta ekosistemnya**): Bertugas sebagai _code linter_ dan _formatter_ (menggunakan sistem _Flat Config_ terbaru) untuk memastikan kode yang ditulis tetap rapi, konsisten, dan bebas dari _bug_ penulisan.

4. **Konfigurasi Variabel Lingkungan (Environment Variables)**

   Langkah selanjutnya adalah mengatur environment variables untuk menyimpan data sensitif seperti kredensial database. Pada proyek ini, kita akan membuat dua file konfigurasi utama, yaitu `.env.local` dan `.env.example`.

   **a. File `.env.local` (Untuk Pengembangan Lokal)**

   File ini digunakan secara eksklusif untuk menjalankan aplikasi di lingkungan komputer Anda (local development). Buat file `.env.local` di root direktori proyek dan sesuaikan nilainya dengan konfigurasi lokal Anda:

   ```env
   PORT=4000
   NODE_ENV=development
   DB_HOST=host_database
   DB_USER=user_database
   DB_PASSWORD=password_database
   DB_NAME=nama_database
   DB_PORT=3306
   ```

   **Penting:** File `.env.local` berisi data rahasia dan TIDAK BOLEH di-push ke repositori cloud (GitHub/GitLab). Pastikan nama file ini nantinya didaftarkan ke dalam `.gitignore`.

   **b. File `.env.example` (untuk referensi repositori)**

   File ini berfungsi sebagai template atau panduan bagi developer lain mengenai kunci (keys) apa saja yang dibutuhkan oleh aplikasi untuk berjalan, tanpa mengekspos nilai (values) aslinya.

   Buat file `.env.example` dan biarkan nilainya kosong atau gunakan nilai tiruan (dummy):

   ```env
   PORT=
   NODE_ENV=
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   DB_PORT=
   ```

   File `.env.example` ini harus di-push ke repositori cloud agar siapapun yang melakukan clone proyek ini tahu variabel apa yang perlu mereka siapkan.

5. **Konfigurasi Nodemon**

   Nodemon digunakan untuk meningkatkan efisiensi pengembangan dengan memantau perubahan file dan melakukan _restart_ server secara otomatis. Agar Nodemon bekerja lebih optimal dan melakukan _restart_ pada file yang tidak relevan (seperti file log atau testing), kita perlu melakukan konfigurasi khusus.

   **a. Membuat File `nodemon.json`**

   Buatlah file bernama `nodemon.json` di _root_ direktori proyek. Konfigurasi ini akan mengatur file mana saja yang harus dipantau dan folder mana yang harus diabaikan.

   ```json
   {
     "watch": ["src"],
     "ext": ".js, .json",
     "ignore": ["node_modules", "logs/*", "tests/*"],
     "exec": "node --env-file=.env.local src/server.js",
     "delay": "1000"
   }
   ```

   - `watch`: Membatasi pemantauan hanya pada folder `src` agar lebih hemat sumber daya.
   - `ignore`: Mencegah _restart_ otomatis saat ada perubahan di folder `node_modules` atau file log.
   - `exec`: Perintah utama untuk menjalankan server (menggunakan flad `--env-file` untuk memuat variabel lingkungan secara otomatis).
   - `delay`: Memberikan jeda 1 detik sebelum _restart_ untuk memastikan semua file telah selesai tersiimpan.

   **b. Penyesuain `package.json`**

   Selanjutnya, daftarkan perintah eksekusi Nodemon kedalam bagian `scripts` pada file `package.json`. Hal ini akan memudahkan untuk menjalankan server hanya dengan satu perintah singkat:

   ```json
   "scripts": {
      "start": "node src/server.js",
      "dev": "nodemon",
      "lint": "eslint",
      "format": "prettier --write"
   }
   ```

   **c. Menjalankan Server Pengembangan**

   Setelah konfigurasi diatas selesai, Anda dapat menjalankan server dalam mode pengembangan dengan perintah:

   ```bash
   npm run dev
   ```

   Kini, setiap kali terjadi perubahan pada kode didalam folder `src`, Nodemon akan mendeteksi perubahan tersebut dan memuat ulang server secara instan.

6. **Setup dan Konfigurasi Linter & Formatter (ESLint & Prettier)**

   Untuk menjagag kualitas kode jauh dari _bug_ dan memiliki gaya penulisan yang konsisten, kita akan mengkonfigurasikan **ESLint** (sebagai _Code Linter_) dan **Prettier** (sebagai _Code Formatter_). Keduanya agar diintegrasikan agar tidak tumpang tindih.

   **a. Konfigurasi Prettier**

   Langkah pertama adalah mengatur aturan pemformatan (_formatting rules_). Buat file `.prettierrc` di _root_ direktori proyek dan isikan konfigurasi berikut:

   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 80,
     "tabWidth": 2
   }
   ```

   Selanjutnya, buatlah file `.prettierignore` untuk memberi tahu Prettier folder mana saja yang tidak perlu dirapikan (agar proses _formatting_ berjalan cepat):

   ```
   node_modules
   coverage
   .env*
   logs
   package-lock.json
   ```

   **b. Konfigurasi Awal ESLint (Format Legacy)**

   Sebagai fondasi yang terintegrasi dengan Prettier, kita akan membuat file konfigurasi ESLint versi _legacy_ (format lama) terlebih dahulu.

   Buat file `.eslintrc.json` dan tambahkan baris berikut. Perhatikan bagian `extends`; disinilah kita menggabungkan ESLint dengan Prettier agar aturan ESLint yang konflik dengan Prettier dimatikan:

   ```json
   {
     "env": {
       "node": true,
       "es2021": true
     },
     "extends": ["eslint:recommended", "plugin:prettier/recommended"],
     "parserOptions": {
       "ecmaVersion": "latest",
       "sourceType": "module"
     },
     "rules": {
       "no-unused-vars": "warn",
       "no-console": "off"
     }
   }
   ```

   **c. Migrasi ESLint ke Flat Config (Standar Modern)**

   Mulai versi 9.x, ESLint menggunakan sistem **Flat Config** sebagai standar. Untuk mengonversi konfigurasi `.eslintrc.json` diatas menjadi _Flat Config_, gunakan _tool_ migrasi resmi dari ESLint dengan menjalankan perintah berikut di terminal:

   ```bash
   npx @eslint/migrate-config .eslintrc.json
   ```

   Perintah ini secara otomatis akan membaca file lama dan menghasilkan file baru bernama `.eslint.config.mjs` (atau `.eslintrc.json`). Setelah perintah ini berhasil, file lama `.eslintrc.json` dapat dihapus.

   **d. Penyesuaian `globals` pada `eslint.config.mjs`**

   Pada _Flat Config_, variabel bawaan Node.JS seperti `console` dan `process` tidak lagi dikenali secara otomatis dan akan memicu _error_ (seperti `process is not defined`). Untuk mengatasinya dapat menggunakan package `globals` yang telah diinstal sebelumnya.

   Buka file `eslint.config.mjs` hasil migrasi, dan pastikan sudah mengimpor dan menambahkan `globals.node` kedalam konfigurasi objek. Hasil akhirnya akan terlihat seperti dibawah:

   ```js
   import globals from "globals";
   import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
   import js from "@eslint/js";

   export default [
     js.configs.recommended,
     eslintPluginPrettierRecommended,
     {
       languageOptions: {
         ecmaVersion: "latest",
         sourceType: "module",
         // Menambahkan global variables untuk lingkungan Node.js
         globals: {
           ...globals.node,
         },
       },
       rules: {
         "no-unused-vars": "warn",
         "no-console": "off",
       },
     },
   ];
   ```

   **Penjelasan Singkat:** Dengan konfigurasi diatas, saat mengetik `process.env.PORT` atau `console.log()` didalam kode, ESLint tidak akan lagi menganggapnya sebagai variabel yang tidak terdefinisi (_undefined variables_).

7. **Setup dan Konfigurasi Git Hooks (Husky & Lint-Staged)**

   Untuk memastikan kode yang masuk ke repositori (melalui `git commit`) selalu dalam keadaan rapi dan bebas _bug_, guna mengotomatiskan proses pengecekan menggunakan **Husky** (pengelola _Git Hooks_) dan **Lint-Staged** (penyaring file yang di-_commit_).

   **a. Konfigurasi Lint-Staged**
   Lint-Staged berfungsi agar ESLint dan Prettier hanya mengecek file yang sedang diubah (file yang berstatus _staged_), bukan seluruh file didalam proyek. Hal tersebut membuat proses _commit_ menjadi jauh lebih cepat.

   Buat file bernama `.lintstagedrc` di _root_ direktori proyek, lalu isikan konfigurasi berikut:

   ```json
   {
      "*.js": [
         "eslint --fix"
         "prettier --write"
      ],
      "*.json": [
         "prettier --write"
      ]
   }
   ```

   **Penjelasan Singkat:** Konfigurasi diatas menginstruksikan sistem: "_Jika file yang di-commit berakhiran `.js`, jalankan ESLint untuk memperbaiki error logika, lalu jalankan Prettier untuk merapikan formatnya. Jika file `.json`, cukup rapikan fotmatnya saja_.

   **b. Inisialisasi Husky**

   Selanjutnya, diperlukan untuk mengaktifkan Husky di dalam proyek. Jalankan perintah inisialisasi resmi dari Husky di Terminal:

   ```bash
   npx husky init
   ```

   Perintah tersebut akan melakukan tiga hal secara otomatis:
   1. Membuat folder `.husky/` di _root_ proyek.
   2. Menambahkan skrip `"prepare": "husky"` di dalam `package.json` (agar Husky otomatis ketika anggota tim lain menjalankan `npm install`).
   3. Membuat file _hook_ bawaan bernama `.husky/pre-commit`.

   **c. Menghubungkan Husky dengan Lint-Staged**

   Langkah terkahir adalah memberi tahu Husky apa yang harus dilakukan sebelum sebuah _commit_ disetujui.

   Buka file `.husky/pre-commit` yang baru saja dibuat oleh perintah sebelumnya. Hapus isi bawaannya (biasanya berisi `npm test`), lalu ganti dengan perintah untuk menjalankan Lint-Staged:

   ```bash
   npx lint-staged
   ```

   **d. Ringkasan Alur Kerja (Workflow)**

   Kini, integrasi alat pengembangan telah sempurna. Setiap kali memberikan (atau anggota tim) menjalankan perintah:

   ```bash
   git commit -m "fitur: menambahkan endpoint login"
   ```

   Sistem akan menjalankan urutan berikut dibelakang layar:
   1. **Husky** mencegat perintah _commit_ tersebut.
   2. Husky memanggil **Lint-Staged**.
   3. Lint-Staged mencari file `.js` yang telah diubah, lalu meyerahkannya ke **ESLint** dan **Prettier**.
   4. Jika ditemukan _error_ fatal yang tidak bisa diperbaiki otomatis, proses _commit_ akan **dibatalkan** dan terminal akan menampilkan pesan _error_-nya.
   5. Jika semua file bersih dan rapi, barulah _commit_ **berhasil** disimpan ke riwayat Git.

## Menajalankan Proyek

Untuk mempermudah proses pengembangan, pengujian, dan peluncuran aplikasi, perlu didaftarkan beberapa perintah pintasan (_shortcut_) ke dalam file konfigurasi utama proyek.

**a. Penyesuaian pada `package.json`**

Buka file `package.json`, cari bagian `"scripts"`, lalu ubah dengan lengkap isinya menjadi seperti dibawah:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "prepare": "husky"
}
```

**Catatan:** Jika file utama aplikasi belum dibuat, pastikan membuat file `src/server.js` terlebih dahulu agar perintah `start` dan `dev` dapat berjalan.

**b. Daftar Perintah dan Fungsinya**

Seteleah scripts ditambahkan, proyek dapat dijalankan dengan perintah-perintah berikut melalui terminal:

| Perintah           | Deskripsi                                                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`      | Menjalankan sever dalam **Mode Pengembangan** (**_Development Mode_**). Perintah ini akan memanggil `nodemon`, serta otomatis akan melakukan _restart_ setiap kali perubahan pada file di dalam folder `src`                                                                                |
| `npm run start`    | Menjalankan server dalam **Mode Produksi** (**_Production Mode_**). Perintah ini akan memanggil `node` secara langsugn tanpa fitur _auto-reload_. Ini adalah perintah standar yang digunakan saat aplikasi di server asli (misalnya menggunakan _process manager_ seperti PM2 atau Docker). |
| `npm run format`   | Merapikan seluruh struktur kode didalam proyek                                                                                                                                                                                                                                              |
| `npm run lint`     | Memindai kode untuk mencari _error_ logika atau pelanggaran standar penulisan                                                                                                                                                                                                               |
| `npm run lint:fix` | Memperbaiki _error_ ESLint secara otomatis (jika memungkinkan).                                                                                                                                                                                                                             |
| `npm run prepare`  | Menginisialisasi _Git Hooks_ (Husky) untuk komputer baru.                                                                                                                                                                                                                                   |
