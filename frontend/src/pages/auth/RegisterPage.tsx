import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import useAuthStore from "../../store/useAuthStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const RegisterSchema = z
  .object({
    username: z.string().min(3, "Username phải có ít nhất 3 kí tự!"),
    email: z
      .string()
      .min(1, "Email bắt buộc phải có!")
      .regex(/^[\w.+-]+@gmail\.com$/, "Chỉ chấp nhận email @gmail.com!"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 kí tự!"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp!",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const { register: signUp } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp(data.username, data.email, data.password);
      localStorage.setItem(
        "bookhub_auth_challenge",
        JSON.stringify({ mode: "verify", email: data.email })
      );
      navigate("/verify-email", {
        state: {
          email: data.email,
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white dark:bg-gray-900/50 p-8 shadow-sm">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2 text-text-light dark:text-text-dark">
              <span className="material-symbols-outlined text-3xl text-primary">
                auto_stories
              </span>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] font-display">
                BookHub
              </h2>
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create an Account
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Join our community of book lovers
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                {...register("username")}
                className="form-input h-12 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                id="username"
                placeholder="Nhập username"
                type="text"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email")}
                className="form-input h-12 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                id="email"
                placeholder="Nhập email"
                type="email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password")}
                className="form-input h-12 w-full rounded-lg border border-gray-300 bg-transparent p-4 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                id="password"
                placeholder="Nhập mật khẩu"
                type="password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                className="form-input h-12 w-full rounded-lg border border-gray-300 bg-transparent p-4 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-base font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              className="font-semibold text-primary hover:underline"
              to="/signin"
            >
              Sign In →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

