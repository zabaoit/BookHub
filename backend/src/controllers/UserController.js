import { query } from "../libs/db.js";

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

export { getProfile, updateProfile };
