# Express + MySQL REST API

Repositori ini merupakan proyek pembelajaran yang memfokuskan pada pengembangan Backend REST API menggunakan **ExpressJS** dan Database **MySQL**, dilengkapi dengan alat pengembangan serta linting modern.

Diharapkan repo ini dapat membantu siapapun diluar sana yang sedang mencari proyek pembelajaran aplikasi Backend bagi para pemula.

---

## Susunan Teknologi

| Kategori                      | Teknologi                                                        |
|-------------------------------|------------------------------------------------------------------|
| **Runtime**/**Framework**     | NodeJS (runtime service), `express` (server framework)      |
| **Database**                  | MySql (database), `mysql2` (library integration)             |
| **Logging**                   | `morgan` (http log), `winston` (app log)           |
| **Development Tools**         | `nodemon` (server refresher), `eslint` (code policy), `prettier` (code formatter), `lint-staged` (git filteting), `husky` (git hooks)|
| **Config**                    | `dotenv` (security: environment variable)                        |

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

    Setelah direktori dibuat, buka folder tersebut menggunakan editor kode (IDE) andalan Anda (misalnya VS Code). Pada saat yang sama, siapkan sebuah repositori kosong di platform *version control* berbasis cloud (seperti GitHub, GitLab, atau Bitbucket) untuk menyimpan basis kode Anda nantinya.

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

    Karena aplikasi ini dibangun di atas *runtime* Node.js, langkah pertama adalah menginisialisasi proyek. Jalankan perintah berikut untuk membuat file `package.json` secara otomatis (melewati *prompt* manual):

    ```bash
    npm init -y
    ```

    File `package.json` ini sangat krusial karena bertindak sebagai manifes proyek. File ini akan mencatat identitas aplikasi, skrip eksekusi (*scripts*), serta melacak seluruh versi pustaka (*library*) yang akan kita gunakan.

3. **Instalasi Dependensi (Dependencies & devDependencies)**

    Setelah file `package.json` terbentuk, tahap selanjutnya adalah menginstal pustaka utama (*dependencies*) yang menjadi fondasi berjalannya aplikasi di *server*:

    ```bash
    npm i express mysql2 dotenv morgan winston
    ```

    - `express`: *Framework* utama untuk membangun REST API.

    - `mysql2`: *Driver* database MySQL dengan performa tinggi dan dukungan *Promise* (untuk fitur *Connection Pool*).

    - `dotenv`: Mengelola variabel lingkungan yang aman (membaca file `.env`).

    - `morgan` & `winston`: Sistem pencatatan aktivitas (*logging*) komprehensif untuk memantau lalu lintas HTTP dan status aplikasi. 

    Selanjutnya, instal pustaka pendukung (*devDependencies*) yang hanya beroperasi selama fase pengembangan. Alat-alat ini akan sangat membantu dalam mempercepat penulisan kode dan menjaga standarisasi format:

    ```bash
    npm i -D nodemon eslint prettier eslint-config-prettier eslint-plugin-prettier @eslint/eslintrc @eslint/js globals
    ```

    - `nodemon`: Melakukan auto-reload server secara instan setiap kali ada perubahan pada kode.

    - `eslint` & `prettier` (**serta ekosistemnya**): Bertugas sebagai *code linter* dan *formatter* (menggunakan sistem *Flat Config* terbaru) untuk memastikan kode yang ditulis tetap rapi, konsisten, dan bebas dari *bug* penulisan.

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