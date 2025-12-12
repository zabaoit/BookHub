const LoginPage = () => {
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
              Welcome Back
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative flex w-full flex-1 items-stretch">
                <input
                  className="form-input h-12 w-full flex-1 rounded-lg border border-gray-300 bg-transparent px-4 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative flex w-full flex-1 items-stretch">
                <input
                  className="form-input h-12 w-full flex-1 rounded-lg border border-gray-300 bg-transparent p-4 pr-12 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                />
                <button className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-gray-500 dark:text-gray-400">
                  <span className="material-symbols-outlined text-xl">
                    visibility_off
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  className="h-4 w-4 rounded border-gray-300 bg-transparent text-primary focus:ring-primary dark:border-gray-600"
                  id="remember-me"
                  type="checkbox"
                />
                <label
                  className="text-sm font-normal text-gray-800 dark:text-gray-300"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
              <a
                className="text-sm font-medium text-primary hover:underline"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <button className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-base font-semibold text-white transition-colors hover:bg-primary/90">
              Sign In
            </button>
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative bg-white dark:bg-gray-900/50 px-2 text-sm text-gray-500 dark:text-gray-400">
                Or continue with
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50">
                <svg
                  className="h-5 w-5"
                  data-alt="Google logo"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    fill="#FFC107"
                  ></path>
                  <path
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    fill="#FF3D00"
                  ></path>
                  <path
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.444-11.261-8.234l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
                    fill="#4CAF50"
                  ></path>
                  <path
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.434,36.338,48,30.836,48,24C48,22.659,47.862,21.35,47.611,20.083z"
                    fill="#1976D2"
                  ></path>
                </svg>
                Google
              </button>
              <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50">
                <svg
                  className="h-5 w-5 text-[#1877F2]"
                  data-alt="Facebook logo"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V15.89h-2.54V12.61h2.54V10.04c0-2.522,1.5-3.9,3.822-3.9,1.1,0,2.25.2,2.25.2v2.9h-1.4c-1.25,0-1.65.75-1.65,1.58v1.88h3.28l-.52,3.28h-2.76v6.008C18.343,21.128,22,16.99,22,12Z"></path>
                </svg>
                Facebook
              </button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? {""}
            <a
              className="font-semibold text-primary hover:underline"
              href="/signup"
            >
              Sign Up →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
