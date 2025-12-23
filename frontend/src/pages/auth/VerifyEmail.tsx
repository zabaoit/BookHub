const VerifyEmail = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden ">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center items-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="layout-content-container flex flex-col max-w-[480px] w-full flex-1">
              {/* <!-- Header/Logo --> */}
              <header className="flex items-center justify-center whitespace-nowrap px-10 py-4">
                <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    auto_stories
                  </span>
                  <h1 className="font-display text-2xl font-bold leading-tight tracking-tight">
                    BookHub
                  </h1>
                </div>
              </header>
              <main className="flex flex-1 items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                  <div className="bg-white p-8 shadow-md rounded-xl  ">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">
                        <span
                          className="material-symbols-outlined text-5xl text-primary"
                          data-icon="mark_email_unread"
                        ></span>
                      </div>
                      <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary">
                        Verify Your Email
                      </h1>
                      <p className="mt-4 text-base font-normal leading-normal text-text-secondary">
                        We sent a verification link to:
                      </p>
                      <p className="text-base font-bold leading-normal text-primary">
                        example@email.com
                      </p>
                      <p className="mt-2 text-sm text-text-secondary">
                        Click the link in the email to complete your
                        registration.
                      </p>
                      <div className="w-full mt-4">
                        <button className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-light text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors">
                          <span className="truncate">Open Email App</span>
                        </button>
                      </div>
                      <div className="mt-4 text-center w-full">
                        <p className="text-sm text-text-secondary">
                          Didn't receive the email?
                        </p>
                        <button
                          className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-text-secondary text-sm font-bold leading-normal tracking-[0.015em] mt-2 opacity-50 cursor-not-allowed"
                          //   disabled=""
                        >
                          <span className="truncate">Resend Link (30s)</span>
                        </button>
                      </div>
                      <div className="relative mt-4 w-full">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center"
                        >
                          <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white px-2 text-text-secondary">
                            Or
                          </span>
                        </div>
                      </div>
                      <div className="w-full mt-4 text-center">
                        <label
                          className="block text-sm font-medium text-text-secondary"
                          htmlFor="code-input"
                        >
                          Enter verification code:
                        </label>
                        <div
                          className="mt-2 flex justify-center gap-2"
                          id="code-input"
                        >
                          <input
                            className="h-12 w-10 rounded-md  text-center text-lg font-semibold shadow-sm focus-within:ring-2 focus-within:border-primary focus-within:ring-primary/20 transition-all"
                            maxLength={1}
                            type="text"
                          />
                          <input
                            className="h-12 w-10 rounded-md  text-center text-lg font-semibold shadow-sm focus-within:ring-2 focus-within:border-primary focus-within:ring-primary/20 transition-all"
                            maxLength={1}
                            type="text"
                          />
                          <input
                            className="h-12 w-10 rounded-md  text-center text-lg font-semibold shadow-sm focus-within:ring-2 focus-within:border-primary focus-within:ring-primary/20 transition-all"
                            maxLength={1}
                            type="text"
                          />
                          <input
                            className="h-12 w-10 rounded-md  text-center text-lg font-semibold shadow-sm focus-within:ring-2 focus-within:border-primary focus-within:ring-primary/20 transition-all"
                            maxLength={1}
                            type="text"
                          />
                          <input
                            className="h-12 w-10 rounded-md  text-center text-lg font-semibold shadow-sm focus-within:ring-2 focus-within:border-primary focus-within:ring-primary/20 transition-all"
                            maxLength={1}
                            type="text"
                          />
                          <input
                            className="h-12 w-10 rounded-md  text-center text-lg font-semibold shadow-sm focus-within:ring-2 focus-within:border-primary focus-within:ring-primary/20 transition-all"
                            maxLength={1}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

