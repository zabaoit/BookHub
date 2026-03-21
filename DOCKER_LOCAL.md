# Chạy BookHub bằng Docker (local)

## 1) Điều kiện
- Đã cài Docker Desktop và đang chạy.
- DB MySQL local đang hoạt động (mặc định `host.docker.internal:3306`).
- File `backend/.env` đã có biến DB + JWT + mail/payment theo nhu cầu.

## 2) Build + Run
Tại thư mục `D:\Project\BookHub`:

```bash
docker compose up -d --build
```

## 3) Truy cập
- Frontend: http://localhost:5173
- API sẽ được reverse-proxy qua cùng domain tại `/api`.

## 4) Xem log
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

## 5) Dừng
```bash
docker compose down
```

## Ghi chú
- `frontend` dùng Nginx và có cấu hình SPA fallback (`/index.html`).
- `backend` đọc biến từ `backend/.env` (không sửa file secrets).
- Trong Compose, `MYSQL_HOST` mặc định là `host.docker.internal` để kết nối MySQL ở máy local.
