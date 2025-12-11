import Header from "../components/Header";

const BooksPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* <!-- Sticky Filter Sidebar --> */}
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <div className="sticky top-24">
              <div className="flex h-full min-h-[700px] flex-col justify-between bg-container-light dark:bg-container-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col border-b border-border-light dark:border-border-dark pb-4">
                    <h1 className="text-text-light dark:text-text-dark text-lg font-bold font-heading">
                      Filters
                    </h1>
                    <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">
                      Refine your search
                    </p>
                  </div>
                  {/* <!-- Price Range Slider --> */}
                  <div className="border-b border-border-light dark:border-border-dark py-4">
                    <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal w-full mb-3">
                      Price Range
                    </p>
                    <div className="flex h-[38px] w-full pt-1.5">
                      <div className="flex h-1.5 w-full rounded-full bg-primary/20">
                        <div className="relative w-[20%]">
                          <div className="absolute -left-2 -top-2 flex flex-col items-center gap-1">
                            <div className="size-5 rounded-full bg-primary border-2 border-container-light dark:border-container-dark shadow"></div>
                            <p className="text-text-light dark:text-text-dark text-xs font-normal leading-normal">
                              $10
                            </p>
                          </div>
                        </div>
                        <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                        <div className="relative w-[25%]">
                          <div className="absolute -right-2 -top-2 flex flex-col items-center gap-1">
                            <div className="size-5 rounded-full bg-primary border-2 border-container-light dark:border-container-dark shadow"></div>
                            <p className="text-text-light dark:text-text-dark text-xs font-normal leading-normal">
                              $75
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Author Search --> */}
                  <div className="border-b border-border-light dark:border-border-dark pb-4">
                    <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal w-full mb-2">
                      Author
                    </p>
                    <label className="flex flex-col min-w-40 h-11 w-full">
                      <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                        <div className="text-text-light/70 dark:text-text-dark/70 flex border border-r-0 border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark items-center justify-center pl-3 rounded-l-lg">
                          <span className="material-symbols-outlined text-xl">
                            search
                          </span>
                        </div>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-full placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 px-3 rounded-l-none border-l-0 text-sm font-normal leading-normal"
                          placeholder="Search by author..."
                          value=""
                        />
                      </div>
                    </label>
                  </div>
                  {/* <!-- Categories Accordion --> */}
                  <div className="flex flex-col border-b border-border-light dark:border-border-dark pb-2">
                    <details
                      className="flex flex-col group"
                      // open=""
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                          Categories
                        </p>
                        <span className="material-symbols-outlined text-text-light dark:text-text-dark group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="flex flex-col gap-2 pt-2 pb-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            // checked=""
                            className="form-checkbox rounded-sm bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Fiction
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            className="form-checkbox rounded-sm bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Non-Fiction
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            // checked=""
                            className="form-checkbox rounded-sm bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Science Fiction
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            className="form-checkbox rounded-sm bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Fantasy
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            className="form-checkbox rounded-sm bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Mystery
                        </label>
                      </div>
                    </details>
                  </div>
                  {/* <!-- Rating Filter --> */}
                  <div className="pt-2 pb-4">
                    <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal w-full mb-2">
                      Rating
                    </p>
                    <div className="flex items-center gap-1 text-accent cursor-pointer">
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="material-symbols-outlined !text-2xl">
                        star
                      </span>
                      <span className="text-text-light/70 dark:text-text-dark/70 text-sm ml-2">
                        &amp; up
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary dark:bg-primary/30 dark:text-white/80 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 dark:hover:bg-primary/40">
                  <span className="truncate">Reset All Filters</span>
                </button>
              </div>
            </div>
          </aside>
          {/* <!-- Books Grid and Sorting --> */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <h1 className="text-3xl font-bold font-heading mb-4 sm:mb-0">
                Browse Books
              </h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-light/70 dark:text-text-dark/70">
                  Sort by:
                </span>
                <div className="flex items-center bg-container-light dark:bg-container-dark border border-border-light dark:border-border-dark rounded-lg">
                  <button className="px-3 py-1.5 text-white bg-primary rounded-l-md font-medium">
                    Newest
                  </button>
                  <button className="px-3 py-1.5 hover:bg-primary/10">
                    Best Sellers
                  </button>
                  <button className="px-3 py-1.5 hover:bg-primary/10 flex items-center gap-1">
                    Price{" "}
                    <span className="material-symbols-outlined !text-base">
                      arrow_upward
                    </span>
                  </button>
                  <button className="px-3 py-1.5 hover:bg-primary/10 rounded-r-md flex items-center gap-1">
                    Price{" "}
                    <span className="material-symbols-outlined !text-base">
                      arrow_downward
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Book Grid --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* <!-- Book Card 1 --> */}
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden group">
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat aspect-[3/4] bg-cover"
                    data-alt="Book cover for 'The Midnight Library'"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6sF0ZWuGr7sPJXuTefeaqoQplltn8HhupWbGvSdGeSrvh4qhverFH_FnmGimk0wd-oulDQgyzKDI_C2WyMusn50a-urHd27kMGVToSGaaePNiRS9CpwUzI8VXnIMcba23sZXND-TQHT0gfyNZOS0mBJolOtpqzKsFPIlCYvRypBlbQaySdE0sG4rx_dgFIi72HLfQVGPWZ67ny3_cP5r8_tGgPPgTyLRj_6xV9L6-e9Cll7xau2AaE9tDttY9sB2GrgjwdglOoKs')",
                    }}
                  ></div>
                  <button className="absolute top-2 right-2 flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 bg-container-light/80 dark:bg-container-dark/80 backdrop-blur-sm text-text-light/80 dark:text-text-dark/80 gap-2 min-w-0 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-lg leading-tight text-text-light dark:text-text-dark">
                    The Midnight Library
                  </h3>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-1">
                    Matt Haig
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-accent">
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="material-symbols-outlined !text-base">
                      star_half
                    </span>
                  </div>
                  <p className="text-xl font-bold text-primary mt-3">$26.00</p>
                  <button className="mt-4 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                    <span className="truncate">Add to Cart</span>
                  </button>
                </div>
              </div>
              {/* <!-- Book Card 2 --> */}
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden group">
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat aspect-[3/4] bg-cover"
                    data-alt="Book cover for 'Project Hail Mary'"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYa3rb-N363Moy3zBL-5HCkQmEdkWUYdRrg_EKisqPpA-OjDF20_R1DOknSfNpJbLdJ4z5XPJYibKTTCRbjRP15rJtS_T9D8mMolhbqOqnNePa1E_UsaacaBnmBwLfLtUXZr2cI1x-tr_TWPT1JVNpc1cEBuBRWiF3hIVfQC8TBHbOBMCIZBrj55qbmHC-SUZJdxvs6GC7_9HMPwnYReAxc9F3WR3RtkySCFEL_sWvosk-Tpkfc_-uKsOY7qLr3AyX5AK_ipJ8HsA')",
                    }}
                  ></div>
                  <button className="absolute top-2 right-2 flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 bg-container-light/80 dark:bg-container-dark/80 backdrop-blur-sm text-text-light/80 dark:text-text-dark/80 gap-2 min-w-0 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-lg leading-tight text-text-light dark:text-text-dark">
                    Project Hail Mary
                  </h3>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-1">
                    Andy Weir
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-accent">
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                  <p className="text-xl font-bold text-primary mt-3">$28.00</p>
                  <button className="mt-4 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                    <span className="truncate">Add to Cart</span>
                  </button>
                </div>
              </div>
              {/* <!-- Book Card 3 --> */}
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden group">
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat aspect-[3/4] bg-cover"
                    data-alt="Book cover for 'Klara and the Sun'"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBM39lPkRba2QTgcvZtsRLBlOU4Sxvbn5Pft21gMYSz7cS7bmQr5b03JERPSPBLcPjaPFIPEeNyZbHJEopPd051L1ptlaDsb-7uJahoCYhRuQWAmA_f9RkmlOR6wb2qxcH6Dhc5dp-Jm4GJq-Cil3npeiZ6wCo0wtZDNhNVAbF8XCrf-rnp--PiOp_9AVz-T6b29v84XuNRVaHrQI7xkPQJXU1CNxVzMaXZ6M1aX3sSEmSnBhn9KH1vXJuKLFxt1ntE0NBQ5xqSJDA')",
                    }}
                  ></div>
                  <button className="absolute top-2 right-2 flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 bg-container-light/80 dark:bg-container-dark/80 backdrop-blur-sm text-text-light/80 dark:text-text-dark/80 gap-2 min-w-0 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-lg leading-tight text-text-light dark:text-text-dark">
                    Klara and the Sun
                  </h3>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-1">
                    Kazuo Ishiguro
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-accent">
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="material-symbols-outlined !text-base">
                      star
                    </span>
                  </div>
                  <p className="text-xl font-bold text-primary mt-3">$22.50</p>
                  <button className="mt-4 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                    <span className="truncate">Add to Cart</span>
                  </button>
                </div>
              </div>
              {/* <!-- Book Card 4 --> */}
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden group">
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat aspect-[3/4] bg-cover"
                    data-alt="Book cover for 'The Four Winds'"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0tMNlezPinrPg5RD4BVeqmuqDzQPamplkMg6CKv0QfyYHe0tn2edqH__vzrsYA9t-8SwWGFo-NAH3AzluU-zLSw3Ur-Fglf5TRWsvCI360uatryr-NfxOUQgdGyKgkUlN6nXjfzAb-sxkk2usbGAQIYV-YblFBIJvkHm1Kbd7duNS87UkQbz1qQWPVed0O7SXxcFpUbl9gSQEgyGilvZpold0CUGtm9SV7fb4oT7T_RZSDYHdIerjMxUwuFDBmFkU_PAeZWUHBVc')",
                    }}
                  ></div>
                  <button className="absolute top-2 right-2 flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 bg-container-light/80 dark:bg-container-dark/80 backdrop-blur-sm text-text-light/80 dark:text-text-dark/80 gap-2 min-w-0 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-lg leading-tight text-text-light dark:text-text-dark">
                    The Four Winds
                  </h3>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-1">
                    Kristin Hannah
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-accent">
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="material-symbols-outlined !text-base">
                      star_half
                    </span>
                  </div>
                  <p className="text-xl font-bold text-primary mt-3">$30.00</p>
                  <button className="mt-4 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                    <span className="truncate">Add to Cart</span>
                  </button>
                </div>
              </div>
              {/* <!-- Skeleton Loaders for more cards --> */}
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-primary/10"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-primary/10 rounded"></div>
                  <div className="h-4 w-1/2 bg-primary/10 rounded mt-2"></div>
                  <div className="h-5 w-1/3 bg-primary/10 rounded mt-3"></div>
                  <div className="h-7 w-full bg-primary/10 rounded mt-4"></div>
                  <div className="h-10 w-full bg-primary/20 rounded-lg mt-4"></div>
                </div>
              </div>
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-primary/10"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-primary/10 rounded"></div>
                  <div className="h-4 w-1/2 bg-primary/10 rounded mt-2"></div>
                  <div className="h-5 w-1/3 bg-primary/10 rounded mt-3"></div>
                  <div className="h-7 w-full bg-primary/10 rounded mt-4"></div>
                  <div className="h-10 w-full bg-primary/20 rounded-lg mt-4"></div>
                </div>
              </div>
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-primary/10"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-primary/10 rounded"></div>
                  <div className="h-4 w-1/2 bg-primary/10 rounded mt-2"></div>
                  <div className="h-5 w-1/3 bg-primary/10 rounded mt-3"></div>
                  <div className="h-7 w-full bg-primary/10 rounded mt-4"></div>
                  <div className="h-10 w-full bg-primary/20 rounded-lg mt-4"></div>
                </div>
              </div>
              <div className="flex flex-col bg-container-light dark:bg-container-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-primary/10"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-primary/10 rounded"></div>
                  <div className="h-4 w-1/2 bg-primary/10 rounded mt-2"></div>
                  <div className="h-5 w-1/3 bg-primary/10 rounded mt-3"></div>
                  <div className="h-7 w-full bg-primary/10 rounded mt-4"></div>
                  <div className="h-10 w-full bg-primary/20 rounded-lg mt-4"></div>
                </div>
              </div>
            </div>
            {/* <!-- Pagination Control --> */}
            <div className="flex items-center justify-center mt-12">
              <nav aria-label="Pagination" className="flex items-center gap-2">
                <a
                  className="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-container-light dark:bg-container-dark text-text-light/70 dark:text-text-dark/70 hover:border-primary hover:text-primary"
                  href="#"
                >
                  <span className="material-symbols-outlined !text-xl">
                    chevron_left
                  </span>
                </a>
                <a
                  className="flex items-center justify-center size-9 rounded-lg bg-primary text-white font-medium"
                  href="#"
                >
                  1
                </a>
                <a
                  className="flex items-center justify-center size-9 rounded-lg bg-container-light dark:bg-container-dark hover:bg-primary/10 text-text-light/70 dark:text-text-dark/70 font-medium"
                  href="#"
                >
                  2
                </a>
                <a
                  className="flex items-center justify-center size-9 rounded-lg bg-container-light dark:bg-container-dark hover:bg-primary/10 text-text-light/70 dark:text-text-dark/70 font-medium"
                  href="#"
                >
                  3
                </a>
                <span className="flex items-center justify-center size-9 text-text-light/70 dark:text-text-dark/70">
                  ...
                </span>
                <a
                  className="flex items-center justify-center size-9 rounded-lg bg-container-light dark:bg-container-dark hover:bg-primary/10 text-text-light/70 dark:text-text-dark/70 font-medium"
                  href="#"
                >
                  10
                </a>
                <a
                  className="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-container-light dark:bg-container-dark text-text-light/70 dark:text-text-dark/70 hover:border-primary hover:text-primary"
                  href="#"
                >
                  <span className="material-symbols-outlined !text-xl">
                    chevron_right
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BooksPage;
