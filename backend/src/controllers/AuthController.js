import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { query } from "../libs/db.js";
import { sendCodeEmail } from "../libs/email.js";

const ACCESS_TOKEN_TTL = "12h";
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 ngày tính bằng milliseconds
const VERIFICATION_CODE_TTL_MINUTES = 30;
const PASSWORD_RESET_CODE_TTL_MINUTES = 30;

const generateCode = () => String(crypto.randomInt(100000, 1000000));
const getExpiryTime = (minutes) => new Date(Date.now() + minutes * 60 * 1000);

const authRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // check email đã tồn tại
    const existingUsers = await query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = existingUsers[0];
    if (user) {
      return res.status(400).json({ message: "Email đã đăng ký!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateCode();
    const verificationExpiresAt = getExpiryTime(VERIFICATION_CODE_TTL_MINUTES);
    // Tạo user mới
    await query(
      `INSERT INTO users
       (username, email, hashed_password, role, email_verification_code, email_verification_expires_at)
       VALUES (?, ?, ?, 'USER', ?, ?)`,
      [username, email, hashedPassword, verificationCode, verificationExpiresAt]
    );

    try {
      await sendCodeEmail({
        to: email,
        subject: "BookHub email verification code",
        title: "Verify your BookHub email",
        code: verificationCode,
        description: "Use this code to verify your email and activate your BookHub account.",
      });
    } catch (mailError) {
      if (String(mailError?.message || "") === "SMTP_NOT_CONFIGURED") {
        await query("DELETE FROM users WHERE email = ?", [email]);
        return res.status(500).json({
          message:
            "SMTP chưa được cấu hình. Hãy thêm SMTP_USER và SMTP_PASS để gửi mã về Gmail.",
        });
      }
      await query("DELETE FROM users WHERE email = ?", [email]);
      return res.status(500).json({ message: `Không thể gửi email xác minh: ${mailError.message}` });
    }

    return res.status(201).json({
      message: "Đăng ký thành công! Mã xác minh đã được gửi về Gmail của bạn.",
      email,
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

const authlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // check email tồn tại
    const users = await query(
      "SELECT id, username, email, hashed_password, role, refresh_token, email_verified_at FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = users[0];
    if (!user) {
      return res
        .status(401)
        .json({ message: "username hoặc password không chính xác!" });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "username hoặc password không chính xác!" });
    }

    if (user.role !== "ADMIN" && !user.email_verified_at) {
      const verificationCode = generateCode();
      const verificationExpiresAt = getExpiryTime(VERIFICATION_CODE_TTL_MINUTES);

      await query(
        "UPDATE users SET email_verification_code = ?, email_verification_expires_at = ? WHERE id = ?",
        [verificationCode, verificationExpiresAt, user.id]
      );

      try {
        await sendCodeEmail({
          to: email,
          subject: "BookHub email verification code",
          title: "Verify your BookHub email",
          code: verificationCode,
          description: "Use this code to verify your email and activate your BookHub account.",
        });
      } catch (mailError) {
        return res.status(500).json({
          message: `Không thể gửi email xác minh: ${mailError.message}`,
        });
      }

      return res.status(403).json({
        message: "Email chưa được xác minh. Vui lòng kiểm tra Gmail để lấy mã xác minh.",
        email,
        verificationSent: true,
      });
    }

    if (user.role === "ADMIN" && !user.email_verified_at) {
      await query("UPDATE users SET email_verified_at = NOW() WHERE id = ?", [user.id]);
    }

    // create accesstoken
    const accessToken = jwt.sign(
      { userId: String(user.id) },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // create refreshtoken
    const refreshToken = crypto.randomBytes(64).toString("hex");

    await query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      user.id,
    ]);

    // set cookie (chỉ secure khi production)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_TTL,
    });

    // return access token
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      accessToken,
      user: {
        id: String(user.id),
        _id: String(user.id),
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

const requestEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    const rows = await query(
      "SELECT id, email_verified_at FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    }

    if (user.email_verified_at) {
      return res.status(200).json({
        message: "Email đã được xác minh trước đó.",
        email,
      });
    }

    const verificationCode = generateCode();
    const verificationExpiresAt = getExpiryTime(VERIFICATION_CODE_TTL_MINUTES);

    await query(
      "UPDATE users SET email_verification_code = ?, email_verification_expires_at = ? WHERE id = ?",
      [verificationCode, verificationExpiresAt, user.id]
    );

    try {
      await sendCodeEmail({
        to: email,
        subject: "BookHub email verification code",
        title: "Verify your BookHub email",
        code: verificationCode,
        description: "Use this code to verify your email and activate your BookHub account.",
      });
    } catch (mailError) {
      if (String(mailError?.message || "") === "SMTP_NOT_CONFIGURED") {
        return res.status(500).json({
          message:
            "SMTP chưa được cấu hình. Hãy thêm SMTP_USER và SMTP_PASS để gửi mã về Gmail.",
        });
      }
      return res.status(500).json({ message: `Không thể gửi email xác minh: ${mailError.message}` });
    }

    return res.status(200).json({
      message: "Mã xác minh đã được gửi về Gmail của bạn.",
      email,
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Vui lòng nhập email và mã xác minh" });
    }

    const rows = await query(
      `SELECT id, email_verification_code, email_verification_expires_at
       FROM users
       WHERE email = ? LIMIT 1`,
      [email]
    );
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    }

    if (!user.email_verification_code || String(user.email_verification_code) !== String(code).trim()) {
      return res.status(400).json({ message: "Mã xác minh không đúng!" });
    }

    if (user.email_verification_expires_at && new Date(user.email_verification_expires_at).getTime() < Date.now()) {
      return res.status(400).json({ message: "Mã xác minh đã hết hạn!" });
    }

    await query(
      `UPDATE users
       SET email_verified_at = NOW(),
           email_verification_code = NULL,
           email_verification_expires_at = NULL
       WHERE id = ?`,
      [user.id]
    );

    return res.status(200).json({
      message: "Xác minh email thành công!",
      email,
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    const rows = await query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    }

    const resetCode = generateCode();
    const resetExpiresAt = getExpiryTime(PASSWORD_RESET_CODE_TTL_MINUTES);

    await query(
      "UPDATE users SET password_reset_code = ?, password_reset_expires_at = ? WHERE id = ?",
      [resetCode, resetExpiresAt, user.id]
    );

    try {
      await sendCodeEmail({
        to: email,
        subject: "BookHub password reset code",
        title: "Reset your BookHub password",
        code: resetCode,
        description: "Use this code to verify your password reset request.",
      });
    } catch (mailError) {
      if (String(mailError?.message || "") === "SMTP_NOT_CONFIGURED") {
        return res.status(500).json({
          message:
            "SMTP chưa được cấu hình. Hãy thêm SMTP_USER và SMTP_PASS để gửi mã về Gmail.",
        });
      }
      return res.status(500).json({ message: `Không thể gửi email đặt lại mật khẩu: ${mailError.message}` });
    }

    return res.status(200).json({
      message: "Mã đặt lại mật khẩu đã được gửi về Gmail của bạn.",
      email,
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const rows = await query(
      `SELECT id, password_reset_code, password_reset_expires_at
       FROM users
       WHERE email = ? LIMIT 1`,
      [email]
    );
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    }

    if (!user.password_reset_code || String(user.password_reset_code) !== String(code).trim()) {
      return res.status(400).json({ message: "Mã đặt lại mật khẩu không đúng!" });
    }

    if (user.password_reset_expires_at && new Date(user.password_reset_expires_at).getTime() < Date.now()) {
      return res.status(400).json({ message: "Mã đặt lại mật khẩu đã hết hạn!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await query(
      `UPDATE users
       SET hashed_password = ?,
           password_reset_code = NULL,
           password_reset_expires_at = NULL
       WHERE id = ?`,
      [hashedPassword, user.id]
    );

    return res.status(200).json({
      message: "Đặt lại mật khẩu thành công!",
      email,
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Vui lòng nhập email và mã xác minh" });
    }

    const rows = await query(
      `SELECT id, password_reset_code, password_reset_expires_at
       FROM users
       WHERE email = ? LIMIT 1`,
      [email]
    );
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    }

    if (!user.password_reset_code || String(user.password_reset_code) !== String(code).trim()) {
      return res.status(400).json({ message: "Mã đặt lại mật khẩu không đúng!" });
    }

    if (user.password_reset_expires_at && new Date(user.password_reset_expires_at).getTime() < Date.now()) {
      return res.status(400).json({ message: "Mã đặt lại mật khẩu đã hết hạn!" });
    }

    return res.status(200).json({
      message: "Xác minh mã đặt lại mật khẩu thành công!",
      email,
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const authLogOut = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
    }

    // tim user co refresh token set về null
    const users = await query(
      "SELECT id FROM users WHERE refresh_token = ? LIMIT 1",
      [refreshToken]
    );
    const user = users[0];
    if (user) {
      await query("UPDATE users SET refresh_token = NULL WHERE id = ?", [user.id]);
    }
    // xóa cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Đăng xuất thành công!" });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

const authRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
    }
    // tim user co refresh token
    const users = await query(
      "SELECT id, username, email, role FROM users WHERE refresh_token = ? LIMIT 1",
      [refreshToken]
    );
    const user = users[0];
    if (!user) {
      return res.status(403).json({ message: "Không có quyền truy cập!" });
    }

    // tạo access token mới
    const newAccessToken = jwt.sign(
      { userId: String(user.id) },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      user: {
        id: String(user.id),
        _id: String(user.id),
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};
export {
  authRegister,
  authlogin,
  authLogOut,
  authRefreshToken,
  requestEmailVerification,
  verifyEmail,
  verifyResetCode,
  forgotPassword,
  resetPassword,
};
