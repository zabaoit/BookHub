const RegisterPage = () => {
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
              Join our community of book loves
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative flex w-full flex-1 items-stretch">
                <input
                  className="form-input h-12 w-full flex-1 rounded-lg border border-gray-300 bg-transparent px-4 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                  id="fullName"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
            </div>
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
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
                  type="password"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-normal text-gray-900 dark:text-gray-200 pb-2"
                htmlFor="confirm-password"
              >
                ConFirm Password
              </label>
              <div className="relative flex w-full flex-1 items-stretch">
                <input
                  className="form-input h-12 w-full flex-1 rounded-lg border border-gray-300 bg-transparent p-4 pr-12 text-base font-normal text-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                  id="confirm-password"
                  placeholder="ConFirm your Password"
                  type="password"
                />
              </div>
            </div>

            <button className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-base font-semibold text-white transition-colors hover:bg-primary/90">
              Create Account
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href="/signin"
            >
              Sign In →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
