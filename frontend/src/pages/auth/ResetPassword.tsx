const ResetPassword = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <main className="flex flex-1 items-center justify-center py-8 md:py-12">
        <div className="layout-content-container flex flex-col max-w-[480px] w-full flex-1">
          <header className="flex items-center justify-center whitespace-nowrap py-4">
            <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
              <span className="material-symbols-outlined text-4xl text-primary">
                auto_stories
              </span>
              <h1 className="font-display text-2xl font-bold leading-tight tracking-tight">
                BookHub
              </h1>
            </div>
          </header>
          <div className="bg-white dark:bg-[#2c2c2c] p-8 sm:p-10 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
            <div className="flex w-full flex-col gap-3 text-center mb-8">
              <h1 className="font-heading text-4xl font-black tracking-tight text-text-light dark:text-text-dark">
                Set a New Password
              </h1>
              <p className="text-base font-normal text-text-light/70 dark:text-text-dark/70">
                Please enter your new password below. Make sure it's secure.
              </p>
            </div>
            <div className="w-full space-y-6">
              <label className="flex flex-col w-full">
                <p className="text-sm font-medium pb-2">New Password</p>
                <div className="flex w-full flex-1 items-stretch rounded-lg border  dark:border-border-dark focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg bg-transparent focus:outline-none focus:ring-0 h-12 p-3 text-base font-normal placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark"
                    placeholder="Enter your new password"
                    type="password"
                    value=""
                  />
                  <div className="flex items-center justify-center pr-3 cursor-pointer">
                    <span className="material-symbols-outlined text-text-light/50 dark:text-text-dark/50">
                      visibility_off
                    </span>
                  </div>
                </div>
              </label>
              <label className="flex flex-col w-full">
                <p className="text-sm font-medium pb-2">Confirm New Password</p>
                <div className="flex w-full flex-1 items-stretch rounded-lg border dark:border-border-dark  focus-within:ring-2 focus-within:border-primary focus-within:ring-primary/20 transition-all">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg bg-transparent focus:outline-none focus:ring-0 h-12 p-3 text-base font-normal placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark"
                    placeholder="Re-enter your new password"
                    type="password"
                    value=""
                  />
                  <div className="flex items-center justify-center pr-3 cursor-pointer">
                    <span className="material-symbols-outlined text-text-light/50 dark:text-text-dark/50">
                      visibility_off
                    </span>
                  </div>
                </div>
                {/* <p className="text-error text-xs mt-1.5">
                Passwords do not match.
              </p> */}
              </label>
            </div>
            <div className="w-full pt-8">
              <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold tracking-wide transition-opacity hover:opacity-90">
                <span className="truncate">Reset Password</span>
              </button>
            </div>
            {/* <div className="mt-8 w-full p-4 rounded-lg bg-green-200/70 text-green-700 border border-green-700/20 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">check_circle</span>
            <p className="text-sm">
              Password reset successfully.{" "}
              <a className="font-bold underline hover:text-success/80" href="#">
                Back to Login
              </a>
            </p>
          </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
