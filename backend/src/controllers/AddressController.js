import { query } from "../libs/db.js";

const getAddresses = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const addresses = await query(
      "SELECT id, full_name, phone, address, is_default, created_at FROM user_addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC",
      [userId]
    );
    return res.status(200).json({
      message: "Lấy danh sách địa chỉ thành công!",
      data: addresses.map(a => ({
        _id: String(a.id),
        fullName: a.full_name,
        phone: a.phone,
        address: a.address,
        isDefault: Boolean(a.is_default),
        createdAt: a.created_at,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const createAddress = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { fullName, phone, address, isDefault } = req.body;

    if (!fullName || !phone || !address) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin địa chỉ!" });
    }

    // If setting as default, clear all existing defaults
    if (isDefault) {
      await query("UPDATE user_addresses SET is_default = 0 WHERE user_id = ?", [userId]);
    }

    // If first address, force default
    const existingCount = await query("SELECT COUNT(*) AS count FROM user_addresses WHERE user_id = ?", [userId]);
    const forceDefault = existingCount[0].count === 0 ? 1 : (isDefault ? 1 : 0);

    const result = await query(
      "INSERT INTO user_addresses (user_id, full_name, phone, address, is_default) VALUES (?, ?, ?, ?, ?)",
      [userId, fullName.trim(), phone.trim(), address.trim(), forceDefault]
    );

    return res.status(201).json({
      message: "Thêm địa chỉ thành công!",
      data: {
        _id: String(result.insertId),
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        isDefault: Boolean(forceDefault),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const updateAddress = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const addressId = Number(req.params.id);
    const { fullName, phone, address } = req.body;

    if (!fullName || !phone || !address) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin địa chỉ!" });
    }

    const existing = await query(
      "SELECT id FROM user_addresses WHERE id = ? AND user_id = ? LIMIT 1",
      [addressId, userId]
    );
    if (!existing.length) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ!" });
    }

    await query(
      "UPDATE user_addresses SET full_name = ?, phone = ?, address = ? WHERE id = ? AND user_id = ?",
      [fullName.trim(), phone.trim(), address.trim(), addressId, userId]
    );

    return res.status(200).json({ message: "Cập nhật địa chỉ thành công!" });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const addressId = Number(req.params.id);

    const existing = await query(
      "SELECT id, is_default FROM user_addresses WHERE id = ? AND user_id = ? LIMIT 1",
      [addressId, userId]
    );
    if (!existing.length) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ!" });
    }

    await query("DELETE FROM user_addresses WHERE id = ? AND user_id = ?", [addressId, userId]);

    // If deleted was default, set next one as default
    if (existing[0].is_default) {
      const remaining = await query(
        "SELECT id FROM user_addresses WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
        [userId]
      );
      if (remaining.length) {
        await query("UPDATE user_addresses SET is_default = 1 WHERE id = ?", [remaining[0].id]);
      }
    }

    return res.status(200).json({ message: "Xóa địa chỉ thành công!" });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const setDefaultAddress = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const addressId = Number(req.params.id);

    const existing = await query(
      "SELECT id FROM user_addresses WHERE id = ? AND user_id = ? LIMIT 1",
      [addressId, userId]
    );
    if (!existing.length) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ!" });
    }

    await query("UPDATE user_addresses SET is_default = 0 WHERE user_id = ?", [userId]);
    await query("UPDATE user_addresses SET is_default = 1 WHERE id = ? AND user_id = ?", [addressId, userId]);

    return res.status(200).json({ message: "Đã đặt làm địa chỉ mặc định!" });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

export { getAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress };
