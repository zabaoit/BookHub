import Footer from "../components/Footer";
import Header from "../components/Header";

const ShippingAddressPage = () => {
  return (
    <div>
      <Header />

      <main className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="layout-content-container flex flex-col w-full">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 font-display">
                CHECKOUT (Step 2 of 4)
              </p>

              <a
                className="flex items-center gap-2 shadow-sm rounded-lg  font-medium text-sm p-2 text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary transition-colors"
                href="/checkout/information"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Information
              </a>
            </div>
            {/* <!-- ProgressBar --> */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between text-sm font-medium text-secondary-text-light dark:text-secondary-text-dark">
                <p>1. Cart Review</p>
                <p className="text-primary font-bold">2. Shipping</p>
                <p>3. Payment</p>
                <p>4. Confirmation</p>
              </div>
              <div className="rounded bg-primary/20">
                <div
                  className="h-2 rounded bg-primary"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            {/* <!-- Progress Bar --> */}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
              {/* <!-- Left Column: Shipping Details --> */}
              <div className="lg:col-span-2 flex flex-col gap-10">
                <div className="flex flex-col gap-8">
                  {/* <!-- Shipping Address Form --> */}
                  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold font-heading leading-tight tracking-tight mb-6">
                      Shipping Address
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col gap-2 md:col-span-2">
                        <p className="text-sm font-medium">Saved Addresses</p>
                        <select className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base">
                          <option value="">Add a new address</option>
                          <option value="1">
                            123 Bookworm Lane, Reading, PA 19601
                          </option>
                          <option value="2">
                            456 Paperback Rd, Austin, TX 78701
                          </option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Full Name</p>
                        <input
                          className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base"
                          placeholder="Jane Doe"
                          type="text"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Phone Number</p>
                        <input
                          className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base"
                          placeholder="0901 234 567"
                          type="tel"
                        />
                      </label>
                      <label className="flex flex-col gap-2 md:col-span-1">
                        <p className="text-sm font-medium">Province / City</p>
                        <select className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base">
                          <option value="">Add a new Province / City</option>
                          <option value="1">
                            123 Bookworm Lane, Reading, PA 19601
                          </option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 md:col-span-1">
                        <p className="text-sm font-medium">Ward / Commune</p>
                        <select className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base">
                          <option value="">Add a new Ward / Commune</option>
                          <option value="1">
                            123 Bookworm Lane, Reading, PA 19601
                          </option>
                        </select>
                      </label>

                      <label className="flex flex-col gap-2 md:col-span-2">
                        <p className="text-sm font-medium">Specific Address</p>
                        <input
                          className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base"
                          placeholder="123 Storybook Street"
                          type="text"
                        />
                      </label>

                      <div className="flex items-center gap-3 md:col-span-2">
                        <input
                          className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark"
                          id="save-address"
                          type="checkbox"
                        />
                        <label className="text-sm" htmlFor="save-address">
                          Save as default address
                        </label>
                      </div>
                    </form>
                  </div>

                  {/* <!-- Shipping Method --> */}
                </div>
              </div>
              {/* <!-- Right Column: Order Summary --> */}

              <div className="lg:col-span-1">
                <div className="sticky top-12">
                  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark flex flex-col gap-6">
                    <h2 className="text-xl font-bold font-heading leading-tight tracking-tight border-b border-border-light dark:border-border-dark pb-4">
                      Order Summary
                    </h2>
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
                      {/* <div className="flex items-center gap-4">
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
                      </div> */}
                    </div>
                    <div className="flex flex-col gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-light dark:text-muted-dark">
                          Subtotal
                        </p>
                        <p className="font-medium">$28.49</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-light dark:text-muted-dark">
                          Shipping
                        </p>
                        <p className="font-medium">$5.00</p>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-3 border-t border-border-light dark:border-border-dark">
                        <p>Total</p>
                        <p>$33.49</p>
                      </div>
                    </div>
                    <a
                      href="/checkout/payment"
                      className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                    >
                      Next: Payment
                    </a>
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

export default ShippingAddressPage;
