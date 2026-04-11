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

1. **Inisialiasi Projek:**

    Mulailah dengan membuat direktori proyek secara lokal menggunakan nama `express-mysql-api`:

    ```Bash
    mkdir express-mysql-api
    ```

    Setelah direktori siap, buka folder tersebut melalui editor kode (IDE) yang digunakan seperti VSCode dan lainnya. Sembari menyiapkan lingkungan kerja, kita dapat membuat repositori baru di platform cloud seperti GitHub, GitLab, atau BitBucket.

    Untuk menghubungkan keduanya, pertama-tama lakukan inisialisasi Git pada direktori lokal yang telah kita buat dengan perintah:

    ```Bash
    git init
    ```

    Langkah berikutnya adalah menghubungkan direktori lokal tersebut dengan repositori daring yang telah dibuat agar saling terintegrasi:

    ```Bash
    git remote add origin <url-repository>
    ```

    Kini, proyek lokal dan repositori cloud yang kita buat telah berhasil terhubung dan siap untuk digunakan secara sinkron.