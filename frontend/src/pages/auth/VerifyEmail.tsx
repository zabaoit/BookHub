import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { authService } from "../../services/authService";

type VerifyMode = "verify" | "reset";

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

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const locationState = location.state as { email?: string; mode?: VerifyMode; code?: string } | null;
  const mode =
    (searchParams.get("mode") as VerifyMode) ||
    locationState?.mode ||
    "verify";
  const queryEmail = searchParams.get("email") || "";
  const cachedChallenge = (() => {
    try {
      const raw = localStorage.getItem("bookhub_auth_challenge");
      return raw ? (JSON.parse(raw) as { mode?: string; email?: string; code?: string }) : null;
    } catch {
      return null;
    }
  })();

  const initialEmail = useMemo(
    () => queryEmail || locationState?.email || cachedChallenge?.email || "",
    [cachedChallenge?.email, locationState?.email, queryEmail]
  );

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(locationState?.code || cachedChallenge?.code || "");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (queryEmail) {
      setEmail(queryEmail);
      return;
    }

    if (locationState?.email) {
      setEmail(locationState.email);
      return;
    }

    if (cachedChallenge?.email) {
      setEmail(cachedChallenge.email);
    }
  }, [cachedChallenge?.email, locationState?.email, queryEmail]);

  const title = mode === "reset" ? "Verify Reset Code" : "Verify Your Email";
  const description =
    mode === "reset"
      ? "Nhập mã vừa tạo để chuyển sang bước đặt lại mật khẩu."
      : "Nhập mã xác minh để hoàn tất kích hoạt tài khoản.";

  const handleResend = async () => {
    if (!email.trim()) {
      toast.error("Vui lòng nhập email trước.");
      return;
    }

    try {
      setResending(true);
      const response =
        mode === "reset"
          ? await authService.forgotPassword(email.trim())
          : await authService.requestEmailVerification(email.trim());
      toast.success(response.message || "Đã gửi lại mã.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Không thể gửi lại mã."));
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !code.trim()) {
      toast.error("Vui lòng nhập đầy đủ mã xác minh.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "reset") {
        await authService.verifyResetCode(email.trim(), code.trim());
        toast.success("Đã xác minh mã đặt lại mật khẩu.");
        localStorage.setItem(
          "bookhub_auth_challenge",
          JSON.stringify({ mode: "reset", email: email.trim(), code: code.trim() })
        );
        navigate("/reset-password", {
          state: {
            email: email.trim(),
            code: code.trim(),
            mode: "reset",
          },
          replace: true,
        });
        return;
      }

      const response = await authService.verifyEmail(email.trim(), code.trim());
      toast.success(response.message || "Xác minh email thành công!");
      localStorage.removeItem("bookhub_auth_challenge");
      navigate("/signin");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Xác minh thất bại."));
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
            <h2 className="text-3xl font-black tracking-tight">{title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!email.trim() && (
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
            )}

            <label className="grid gap-2">
              <span className="text-sm font-medium text-muted-foreground">Verification Code</span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="h-12 rounded-2xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Checking..." : mode === "reset" ? "Continue to Reset Password" : "Verify Email"}
            </button>
          </form>

          {email && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Mã đã được gửi tới email của bạn.
            </p>
          )}

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="flex h-12 w-full items-center justify-center rounded-2xl border border-border bg-secondary text-sm font-semibold text-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>

            <Link className="text-center text-sm text-muted-foreground hover:text-foreground" to="/signin">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
