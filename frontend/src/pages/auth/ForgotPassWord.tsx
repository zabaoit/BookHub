import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
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

const ForgotPassWord = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Vui lòng nhập email.");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.forgotPassword(email.trim());
      localStorage.setItem(
        "bookhub_auth_challenge",
        JSON.stringify({ mode: "reset", email: email.trim() })
      );

      toast.success(response.message || "Đã tạo mã đặt lại mật khẩu.");
      navigate("/verify-email", {
        state: {
          email: email.trim(),
          mode: "reset",
        },
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Không thể tạo mã đặt lại mật khẩu."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-display text-foreground">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-4xl text-primary">auto_stories</span>
              <h1 className="text-2xl font-bold">BookHub</h1>
            </div>
            <h2 className="text-3xl font-black tracking-tight">Forgot Password</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Nhập email của bạn, mình sẽ tạo mã để đặt lại mật khẩu.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 rounded-2xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link className="font-semibold text-primary hover:underline" to="/signin">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassWord;
