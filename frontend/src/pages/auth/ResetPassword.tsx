import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { authService } from "../../services/authService";

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as { response?: { data?: { message?: unknown } } };
    const message = maybeError.response?.data?.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { email?: string; code?: string; mode?: string } | null;
  const cachedChallenge = (() => {
    try {
      const raw = localStorage.getItem("bookhub_auth_challenge");
      return raw ? (JSON.parse(raw) as { mode?: string; email?: string; code?: string }) : null;
    } catch {
      return null;
    }
  })();

  const email = locationState?.email || cachedChallenge?.email || "";
  const code = locationState?.code || cachedChallenge?.code || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !code.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword(email.trim(), code.trim(), password);
      toast.success(response.message || "Đặt lại mật khẩu thành công!");
      localStorage.removeItem("bookhub_auth_challenge");
      navigate("/signin");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Không thể đặt lại mật khẩu."));
    } finally {
      setLoading(false);
    }
  };

  if (!email || !code) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
        <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Thiếu thông tin đặt lại mật khẩu</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Vui lòng đi qua trang quên mật khẩu để lấy mã hợp lệ.
          </p>
          <Link
            to="/forgot-password"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background font-display text-foreground">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-4xl text-primary">auto_stories</span>
              <h1 className="text-2xl font-bold">BookHub</h1>
            </div>
            <h2 className="text-3xl font-black tracking-tight">Reset Password</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Nhập mật khẩu mới cho tài khoản của bạn.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-muted-foreground">New Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                placeholder="Enter new password"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-muted-foreground">Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                placeholder="Re-enter new password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Back to{" "}
            <Link className="font-semibold text-primary hover:underline" to="/signin">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
