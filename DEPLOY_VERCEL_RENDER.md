# Deploy BookHub (Frontend Vercel + Backend Render)

## 1) Backend lên Render
1. Vào Render -> New -> Blueprint
2. Chọn repo `BookHub`
3. Render tự đọc `backend/render.yaml`
4. Khai báo đầy đủ biến môi trường cho backend:
   - `FRONTEND_URL=https://<ten-du-an>.vercel.app`
   - `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
   - `ACCESS_TOKEN_SECRET`
   - `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (nếu dùng mail)
5. Deploy xong, lấy URL backend ví dụ: `https://bookhub-backend.onrender.com`

## 2) Frontend lên Vercel
1. Import repo `BookHub` vào Vercel
2. Root Directory: `frontend`
3. Framework: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Env trên Vercel:
   - `VITE_API_BASE_URL=https://bookhub-backend.onrender.com/api`
7. Deploy

## 3) CORS backend
- Backend đọc `FRONTEND_URL` (một domain) hoặc `FRONTEND_URLS` (nhiều domain, phân tách dấu phẩy).
- Ví dụ cho preview + production:
  - `FRONTEND_URLS=https://bookhubver1.vercel.app,https://bookhub-git-main-<user>.vercel.app`

## 4) Kiểm tra nhanh
- Frontend mở được trang home
- Gọi `GET <backend>/api/categories` trả 200
- Đăng nhập/đăng ký không lỗi CORS
