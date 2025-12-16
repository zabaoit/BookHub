import { Link } from "react-router";

const ForgotPassWord = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden ">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center items-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="layout-content-container flex flex-col max-w-[480px] w-full flex-1">
              {/* <!-- Header/Logo --> */}
              <header className="flex items-center justify-center whitespace-nowrap px-10 py-8">
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
                {/* <!-- PageHeading --> */}
                <div className="flex flex-wrap justify-between gap-3 mb-6 text-center">
                  <div className="flex w-full flex-col gap-2">
                    <p className="font-display text-3xl font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">
                      Forgot Your Password?
                    </p>
                    <p className="text-muted-light dark:text-muted-dark text-base font-normal leading-normal">
                      No problem. Enter the email address associated with your
                      account, and we'll send you a link to reset your password.
                    </p>
                  </div>
                </div>
                {/* <!-- Form Container --> */}
                <div className="flex flex-col gap-6">
                  {/* <!-- TextField --> */}
                  <div className="flex flex-col gap-4">
                    <label className="flex flex-col w-full">
                      <p className="text-sm font-medium leading-normal pb-2 text-text-light dark:text-text-dark">
                        Email Address
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-[#3a3a3a] text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:border-primary focus:ring-primary h-12 p-3 text-base font-normal leading-normal"
                        placeholder="you@example.com"
                        type="email"
                        value=""
                      />
                    </label>
                  </div>
                  {/* <!-- SingleButton --> */}
                  <div className="flex justify-center">
                    <Link
                      to="/verify-email"
                      className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
                    >
                      <span className="truncate">Send Reset Link</span>
                    </Link>
                  </div>
                  {/* <!-- Success Message (hidden by default) --> */}
                  {/* <!-- To show this, remove the 'hidden' className and add 'flex' --> */}
                  <div className="hidden items-start gap-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <span className="material-symbols-outlined text-accent-success mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <p className="font-medium text-green-800 dark:text-green-300">
                        Check your inbox!
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        We've sent a password reset link to your email address.
                      </p>
                    </div>
                  </div>
                  {/* <!-- MetaText --> */}
                  <Link
                    className="text-muted-light dark:text-muted-dark text-sm font-normal leading-normal text-center hover:underline"
                    to="/signin"
                  >
                    <span className="font-normal">Remember your password?</span>{" "}
                    <span className="font-bold text-primary">
                      Back to Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassWord;
