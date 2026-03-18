import bcrypt from "bcrypt";
import { query } from "../libs/db.js";

const toUserDto = (user) => ({
  _id: String(user.id),
  username: user.username,
  email: user.email,
  phone: user.phone || "",
  birthday: user.birthday ? user.birthday.toISOString().split("T")[0] : "",
  gender: user.gender || "",
  role: user.role,
  createdAt: user.created_at,
});

const getProfile = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const users = await query(
      "SELECT id, username, email, phone, birthday, gender, role, created_at FROM users WHERE id = ? LIMIT 1",
      [userId]
    );
    const user = users[0];
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    return res.status(200).json({
      message: "Lấy thông tin thành công!",
      data: {
        _id: String(user.id),
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        birthday: user.birthday ? user.birthday.toISOString().split("T")[0] : "",
        gender: user.gender || "",
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { username, phone, birthday, gender } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Tên người dùng không được để trống!" });
    }

    // Check if username is taken by another user
    const existing = await query(
      "SELECT id FROM users WHERE username = ? AND id != ? LIMIT 1",
      [username.trim(), userId]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Tên người dùng đã được sử dụng!" });
    }

    await query(
      "UPDATE users SET username = ?, phone = ?, birthday = ?, gender = ? WHERE id = ?",
      [username.trim(), phone || null, birthday || null, gender || null, userId]
    );

    const users = await query(
      "SELECT id, username, email, phone, birthday, gender, role FROM users WHERE id = ? LIMIT 1",
      [userId]
    );
    const updatedUser = users[0];

    return res.status(200).json({
      message: "Cập nhật thông tin thành công!",
      data: {
        _id: String(updatedUser.id),
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
        birthday: updatedUser.birthday
          ? updatedUser.birthday.toISOString().split("T")[0]
          : "",
        gender: updatedUser.gender || "",
        role: updatedUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Number(req.query.limit || 20));
    const offset = (page - 1) * limit;
    const search = String(req.query.search || "").trim();
    const role = String(req.query.role || "").trim().toUpperCase();

    const conditions = [];
    const params = [];

    if (search) {
      conditions.push("(username LIKE ? OR email LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (role && ["USER", "ADMIN"].includes(role)) {
      conditions.push("role = ?");
      params.push(role);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countRows = await query(
      `SELECT COUNT(*) AS total FROM users ${whereClause}`,
      params
    );
    const total = Number(countRows[0]?.total || 0);

    const users = await query(
      `SELECT id, username, email, phone, birthday, gender, role, created_at
       FROM users
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return res.status(200).json({
      message: "Lấy danh sách người dùng thành công!",
      data: users.map(toUserDto),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const existingRows = await query(
      "SELECT id, username, email, role FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    const existing = existingRows[0];

    if (!existing) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    const nextUsername = typeof username === "string" && username.trim() ? username.trim() : existing.username;
    const nextEmail = typeof email === "string" && email.trim() ? email.trim() : existing.email;
    const nextRole = typeof role === "string" && role.trim() ? role.trim().toUpperCase() : existing.role;

    if (!["USER", "ADMIN"].includes(nextRole)) {
      return res.status(400).json({ message: "Role không hợp lệ!" });
    }

    const duplicateRows = await query(
      "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ? LIMIT 1",
      [nextUsername, nextEmail, id]
    );

    if (duplicateRows.length > 0) {
      return res.status(400).json({ message: "Tên đăng nhập hoặc email đã được sử dụng!" });
    }

    await query(
      "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?",
      [nextUsername, nextEmail, nextRole, id]
    );

    const updatedRows = await query(
      "SELECT id, username, email, phone, birthday, gender, role, created_at FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    return res.status(200).json({
      message: "Cập nhật người dùng thành công!",
      data: toUserDto(updatedRows[0]),
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRows = await query("SELECT id FROM users WHERE id = ? LIMIT 1", [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    await query("DELETE FROM users WHERE id = ?", [id]);

    return res.status(200).json({ message: "Xóa người dùng thành công!" });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const createUserByAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const nextRole = typeof role === "string" && role.trim() ? role.trim().toUpperCase() : "USER";
    if (!["USER", "ADMIN"].includes(nextRole)) {
      return res.status(400).json({ message: "Role không hợp lệ!" });
    }

    const existingRows = await query(
      "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1",
      [email.trim(), username.trim()]
    );

    if (existingRows.length > 0) {
      return res.status(400).json({ message: "Email hoặc username đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO users (username, email, hashed_password, role, email_verified_at) VALUES (?, ?, ?, ?, NOW())",
      [username.trim(), email.trim(), hashedPassword, nextRole]
    );

    const createdRows = await query(
      "SELECT id, username, email, phone, birthday, gender, role, created_at FROM users WHERE id = ? LIMIT 1",
      [result.insertId]
    );

    return res.status(201).json({
      message: "Tạo người dùng thành công!",
      data: toUserDto(createdRows[0]),
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

export { getProfile, updateProfile, getAllUsers, updateUserById, deleteUserById, createUserByAdmin };
