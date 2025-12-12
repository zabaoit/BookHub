const OrderSuccessPage = () => {
  return (
    <div>
      <main className="flex flex-1 justify-center py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="layout-content-container flex flex-col w-full max-w-2xl flex-1">
          <div className="bg-card-light dark:bg-card-dark shadow-lg rounded-xl p-8 sm:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center justify-center size-20 rounded-full bg-primary">
                <span className="material-symbols-outlined !text-5xl text-white">
                  done
                </span>
              </div>
            </div>
            <h1 className="text-primary tracking-wide text-3xl sm:text-4xl font-bold leading-tight font-heading mb-4">
              ORDER CONFIRMED
            </h1>
            <p className="text-base font-normal leading-normal pb-6 pt-1 text-text-light dark:text-text-dark/80">
              Thank you for your purchase!
            </p>
            <div className="border-y border-border-light dark:border-border-dark/50 py-4">
              <div className="flex justify-between gap-x-6 py-2">
                <p className="text-sm font-medium text-text-light/70 dark:text-text-dark/60">
                  Order ID:
                </p>
                <p className="text-sm font-semibold text-text-light dark:text-text-dark text-right">
                  #BK12098457
                </p>
              </div>
              <div className="flex justify-between gap-x-6 py-2">
                <p className="text-sm font-medium text-text-light/70 dark:text-text-dark/60">
                  Estimated Delivery:
                </p>
                <p className="text-sm font-semibold text-text-light dark:text-text-dark text-right">
                  June 15, 2024 - June 18, 2024
                </p>
              </div>
            </div>
            <p className="text-base font-normal leading-normal pt-6 pb-8 px-4 text-center text-text-light dark:text-text-dark/80">
              {" "}
              A confirmation email with all the details has been sent to your
              registered email address.{" "}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/"
                className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/10 transition-colors"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccessPage;
