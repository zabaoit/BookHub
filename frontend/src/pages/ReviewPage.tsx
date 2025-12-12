import Footer from "../components/Footer";
import Header from "../components/Header";

const ReviewPage = () => {
  return (
    <div>
      <Header />
      <main className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="layout-content-container flex flex-col w-full">
            {/* <!-- PageHeading --> */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 font-display">
                CHECKOUT (Step 4 of 4)
              </p>

              <a
                className="flex items-center shadow-sm rounded-lg gap-2  font-medium text-sm p-2 text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary transition-colors"
                href="/checkout/payment"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Payment
              </a>
            </div>
            {/* <!-- ProgressBar --> */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between text-sm font-medium text-secondary-text-light dark:text-secondary-text-dark">
                <p>1. Cart Review</p>
                <p>2. Shipping</p>
                <p>3. Payment</p>
                <p className="text-primary font-bold">4. Confirmation</p>
              </div>
              <div className="rounded bg-primary/20">
                <div
                  className="h-2 rounded bg-primary"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-border-light dark:border-border-dark mb-4">
                    <h2 className="font-heading text-xl font-bold text-text-light dark:text-text-dark">
                      Shipping Information
                    </h2>
                    <a
                      className="text-sm font-medium text-primary hover:underline"
                      href="#"
                    >
                      Edit
                    </a>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-4">
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Full Name
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      Jane Doe
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Phone
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      (+1) 123-456-7890
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Address
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      123 Reading Lane, Booksville, BK 54321, USA
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Method
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      Standard Shipping
                    </p>
                  </div>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-border-light dark:border-border-dark mb-4">
                    <h2 className="font-heading text-xl font-bold text-text-light dark:text-text-dark">
                      Payment Method
                    </h2>
                    <a
                      className="text-sm font-medium text-primary hover:underline"
                      href="#"
                    >
                      Edit
                    </a>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-4">
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Method
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-green-600">
                        account_balance_wallet
                      </span>
                      <p className="text-text-light dark:text-text-dark text-sm font-medium">
                        Momo Payment
                      </p>
                    </div>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Details
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      Phone: •••• •••• 1234
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-12">
                  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark flex flex-col gap-6">
                    <h2 className="text-xl font-bold font-heading leading-tight tracking-tight border-b border-border-light dark:border-border-dark pb-4">
                      Order Summary
                    </h2>
                    {/* <div className="space-y-4 mb-6 flex flex-col gap-4 max-h-56 overflow-y-auto pr-2">
                    <div className="flex items-start gap-4">
                      <img
                        className="w-16 h-24 object-cover rounded"
                        data-alt="The Midnight Library book cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9o9FwjUBJH5amot6oarvHkKBMP_ieKA5g5yggQXQnaRjgrOUo1jlPgVeKND6Gok-ao07wGbEikrfwEkQl_NVljoBYfh69trgzJvGIVmXB0Xz1MZuWGJlXmVW_vvsAA9aWAmS6HA4LggPfKKFrq1uhCNNKimpHaP2kLQUbaHZuQq3dhl8-wfik0swItqd6qG7z5O9QZ9TDeqhmoTzXlIB6sUUfxTMF9NBuhv6fKoS8POntzXBxmPEs8rWlQP_Bzh0tK40Ft3Ce94k3"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-text-light dark:text-text-dark">
                          The Midnight Library
                        </p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          Qty: 1
                        </p>
                      </div>
                      <p className="text-sm font-medium text-text-light dark:text-text-dark">
                        $15.99
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <img
                        className="w-16 h-24 object-cover rounded"
                        data-alt="The Vanishing Half book cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB04yI0LwP3ckmPTL4j-aSwsg6sWi6Mx3OSljHrmcdHAzQLt8YS-MwsMAk17cFmMcMoid4blk-8fmWiVYoZmbzhk2yCWGJ_tPdVDaWaRiFQu7_0cGhwByVK8f11d_7ck6brNVxMRwCZxwSgpt0froK3QVLIVmuv55UZpC1fQ2UPyPkFdPXxBzqu05TTVpJZQ0lFETxtTjw0ygUnp_Ucrk4W8cCnB-ey2As9ZkwO8cnZUNPpxZh_pXD9GyB4qVrdYus7Y8R_SliKIumZ"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-text-light dark:text-text-dark">
                          The Vanishing Half
                        </p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          Qty: 1
                        </p>
                      </div>
                      <p className="text-sm font-medium text-text-light dark:text-text-dark">
                        $18.50
                      </p>
                    </div>
                  </div> */}
                    <div className="flex flex-col gap-4 max-h-56 overflow-y-auto pr-2">
                      <div className="flex items-center gap-4">
                        <img
                          alt="The Midnight Library book cover"
                          className="w-16 h-24 object-cover rounded"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS7lzuu0tmmlVGGNSCYTT4s-ArQKkJC_XbEdgUtCMzYZM2oR62NZQ0VvUwOgNvIg3BVhruTMB_vWnbDP7RCQ0YOhSUwcH18XKyo8qMDmZ3bDWsFMaCzFPObr9MPd-7fuC6ePzaVhAdZkRd746SuZ6LgMV3GhSVrKrEkXfOtFeZW8j41xPRm6aKwL5M7g6n9QvkzHA5DEtBY418LESX5-weWMwIx5yhy0y9oXPXoWT02ErWrXqDkwdErO28kmgDQKQyej736EXZ89eY"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-sm">
                            The Midnight Library
                          </p>
                          <p className="text-sm text-muted-light dark:text-muted-dark">
                            Qty: 1
                          </p>
                        </div>
                        <p className="font-medium">$15.99</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          alt="An open book with pages fanned out"
                          className="w-16 h-24 object-cover rounded"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzO5yAEv4KMTJTBmJ3K5lqiUvHf8Jfj9FFWbJh129JFQRLXJxeOmvaMP5diOFB0Acogz_9jTRTpj4Lu16ar86PY0KBg8nM0uzDQxcZVw5RrQe3T16QNAa39Mgf6WiSif3pCBkkpSe5VoBncOtg7uLjEpnLruYZxBBsD7FOdyg_nfPPTDbkyW5BCEuch52LC3LIiQbUqnx6HBaQrrHk0PwS2OP2HICw_cUGd9spr7cEpIT_2sZiJwc4kQ-R9zbhLttmDonw0V-rePcR"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-sm">Dune</p>
                          <p className="text-sm text-muted-light dark:text-muted-dark">
                            Qty: 1
                          </p>
                        </div>
                        <p className="font-medium">$12.50</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          alt="An open book with pages fanned out"
                          className="w-16 h-24 object-cover rounded"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzO5yAEv4KMTJTBmJ3K5lqiUvHf8Jfj9FFWbJh129JFQRLXJxeOmvaMP5diOFB0Acogz_9jTRTpj4Lu16ar86PY0KBg8nM0uzDQxcZVw5RrQe3T16QNAa39Mgf6WiSif3pCBkkpSe5VoBncOtg7uLjEpnLruYZxBBsD7FOdyg_nfPPTDbkyW5BCEuch52LC3LIiQbUqnx6HBaQrrHk0PwS2OP2HICw_cUGd9spr7cEpIT_2sZiJwc4kQ-R9zbhLttmDonw0V-rePcR"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-sm">Dune</p>
                          <p className="text-sm text-muted-light dark:text-muted-dark">
                            Qty: 1
                          </p>
                        </div>
                        <p className="font-medium">$12.50</p>
                      </div>
                    </div>
                    {/*  */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                      <div className="flex justify-between text-sm">
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                          Books Subtotal
                        </p>
                        <p className="text-text-light dark:text-text-dark">
                          $34.49
                        </p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                          Shipping
                        </p>
                        <p className="text-text-light dark:text-text-dark">
                          $5.00
                        </p>
                      </div>
                      {/* Discount */}
                      {/* <div className="flex justify-between text-sm text-green-600">
                      <p>Discount</p>
                      <p>-$5.00</p>
                      </div> */}
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-border-light dark:border-border-dark mt-2 text-text-light dark:text-text-dark">
                        <p>TOTAL</p>
                        <p>$37.45</p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 space-y-3">
                      <a
                        href="/order-success"
                        className="w-full bg-primary flex items-center justify-center text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Confirm &amp; Pay
                      </a>
                      <a
                        href="/cart"
                        className="w-full bg-transparent flex items-center justify-center border border-primary text-primary font-bold py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        Back to Cart
                      </a>

                      <a className="w-full flex items-center justify-center text-text-muted-light dark:text-text-muted-dark font-medium text-sm py-2 hover:underline hover:cursor-pointer">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewPage;
