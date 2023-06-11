**Cara Menjalankan App**
- Ketik "npm install" pada terminal
- Setup database pada file config/config.json
- Jalankan perintah "npm run db:create" untuk membuat database baru
- Jalankan perintah "npm run db:migrate" untuk generate migration
- Generate data dummy yang disediakan dengan mengetikkan "npm run db:seed"
- Buat file .env yang berisi SESSION_KEY dan JWT_KEY, nilai disesuaikan dengan referensi masing-masing
- Jalankan perintah "npm run dev" untuk menyalakan server, kemudian testing endpoint pada file routes 