import Header from "../../components/Header";

const BookDetailPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-8">
          {/* <!-- Breadcrumbs and Back Link --> */}
          <nav className="flex justify-between items-center">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <a className="hover:text-primary" href="#">
                Home
              </a>
              <span className="text-gray-400">/</span>
              <a className="hover:text-primary" href="#">
                Fiction
              </a>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-text-light dark:text-text-dark">
                The Midnight Library
              </span>
            </div>
            <a
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              href="#"
            >
              <span className="material-symbols-outlined ">arrow_back</span>
              Back
            </a>
          </nav>
          {/* <!-- Book Details Section --> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* <!-- Left Column: Image Gallery --> */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                <div
                  className="w-16 h-20 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer border-2 border-primary"
                  data-alt="The Midnight Library book cover thumbnail"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0tMNlezPinrPg5RD4BVeqmuqDzQPamplkMg6CKv0QfyYHe0tn2edqH__vzrsYA9t-8SwWGFo-NAH3AzluU-zLSw3Ur-Fglf5TRWsvCI360uatryr-NfxOUQgdGyKgkUlN6nXjfzAb-sxkk2usbGAQIYV-YblFBIJvkHm1Kbd7duNS87UkQbz1qQWPVed0O7SXxcFpUbl9gSQEgyGilvZpold0CUGtm9SV7fb4oT7T_RZSDYHdIerjMxUwuFDBmFkU_PAeZWUHBVc')",
                  }}
                ></div>
                <div
                  className="w-16 h-20 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer border border-border-light dark:border-border-dark"
                  data-alt="Book spine of The Midnight Library"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBM39lPkRba2QTgcvZtsRLBlOU4Sxvbn5Pft21gMYSz7cS7bmQr5b03JERPSPBLcPjaPFIPEeNyZbHJEopPd051L1ptlaDsb-7uJahoCYhRuQWAmA_f9RkmlOR6wb2qxcH6Dhc5dp-Jm4GJq-Cil3npeiZ6wCo0wtZDNhNVAbF8XCrf-rnp--PiOp_9AVz-T6b29v84XuNRVaHrQI7xkPQJXU1CNxVzMaXZ6M1aX3sSEmSnBhn9KH1vXJuKLFxt1ntE0NBQ5xqSJDA')",
                  }}
                ></div>
                <div
                  className="w-16 h-20 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer border border-border-light dark:border-border-dark"
                  data-alt="Inside pages of a book"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYa3rb-N363Moy3zBL-5HCkQmEdkWUYdRrg_EKisqPpA-OjDF20_R1DOknSfNpJbLdJ4z5XPJYibKTTCRbjRP15rJtS_T9D8mMolhbqOqnNePa1E_UsaacaBnmBwLfLtUXZr2cI1x-tr_TWPT1JVNpc1cEBuBRWiF3hIVfQC8TBHbOBMCIZBrj55qbmHC-SUZJdxvs6GC7_9HMPwnYReAxc9F3WR3RtkySCFEL_sWvosk-Tpkfc_-uKsOY7qLr3AyX5AK_ipJ8HsA')",
                  }}
                ></div>
              </div>
              <div className="w-full flex-1 order-1 md:order-2">
                <div
                  className="w-full h-auto aspect-[280/400] max-w-[280px] md:max-w-none mx-auto rounded-xl bg-center bg-no-repeat bg-cover"
                  data-alt="Main book cover of The Midnight Library"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6sF0ZWuGr7sPJXuTefeaqoQplltn8HhupWbGvSdGeSrvh4qhverFH_FnmGimk0wd-oulDQgyzKDI_C2WyMusn50a-urHd27kMGVToSGaaePNiRS9CpwUzI8VXnIMcba23sZXND-TQHT0gfyNZOS0mBJolOtpqzKsFPIlCYvRypBlbQaySdE0sG4rx_dgFIi72HLfQVGPWZ67ny3_cP5r8_tGgPPgTyLRj_6xV9L6-e9Cll7xau2AaE9tDttY9sB2GrgjwdglOoKs')",
                  }}
                ></div>
              </div>
            </div>
            {/* <!-- Right Column: Book Info --> */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl lg:text-4xl font-black font-heading tracking-tight">
                  The Midnight Library
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  by Matt Haig
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined">star_half</span>
                </div>
                <a
                  className="text-sm text-gray-500 hover:underline"
                  href="#reviews"
                >
                  (1,283 reviews)
                </a>
                <span className="w-px h-4 bg-border-light dark:bg-border-dark"></span>
                <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                  <div className="size-2 rounded-full bg-success"></div>
                  In Stock
                </div>
              </div>
              <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Publisher:</strong> Viking
                </p>
                <p>
                  <strong>Published:</strong> August 13, 2020
                </p>
                <p>
                  <strong>ISBN:</strong> 978-0525559474
                </p>
                <p>
                  <strong>Pages:</strong> 304
                </p>
                <p>
                  <strong>Language:</strong> English
                </p>
              </div>
              <div className="flex items-baseline gap-3 pt-4">
                <p className="text-4xl font-bold text-error">$15.60</p>
                <p className="text-xl text-gray-500 line-through">$26.00</p>
                <div className="rounded bg-accent/50 px-2 py-0.5 text-sm font-bold text-primary">
                  -40%
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center border border-border-light dark:border-border-dark rounded-lg">
                  <button className="p-2 h-12 w-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <input
                    className="w-12 h-12 text-center border-y-0 border-x border-border-light dark:border-border-dark bg-transparent focus:ring-0"
                    type="text"
                    value="1"
                  />
                  <button className="p-2 h-12 w-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <button className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 rounded-lg bg-primary h-12 px-6 text-white font-bold hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                  Add to Cart
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border-2 border-primary h-12 px-6 text-primary font-bold hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                  Add to Wishlist
                </button>
              </div>
              <div className="flex items-center gap-3 pt-4 text-sm text-gray-500">
                <span>Share:</span>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full border border-border-light dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800">
                    <img
                      alt="facebook icon"
                      className="w-4 h-4 opacity-60"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsentVZSB_5H0rUiBQWID6g6Mb_8MsbVEL7nZxAc5DK6MQ4icJS_6H8ZQa88KPeHNkFjlZ2eluZQAe6nnIB7yAMOhDvAiAaSK75PErL-vxIkws8xL_vkPFCVDa189fJn1-LHHIhdvqkfVwXxgYRkGMJGioH5-wtEjHONmMMcKPpPHdQCJTRPgkyFL1AtWY-NJy_8cz4aaHs3QsnkhIf7Ea9HTftnjONeTjJCYwGWL6T9bMs_7pQinf_wZ1K-JJ_kHt2leM0mJMW1A"
                    />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 rounded-full border border-border-light dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800">
                    <img
                      alt="twitter icon"
                      className="w-4 h-4 opacity-60"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMm7fPOKCRqJZ7w4NMKsjRuVNH0FoPyAyg2pe0uaTUjoDkfIWT8Oy07PzU7ASzwKACvUxPdELhyF2kuy7BjHrtTGCKf3INRy7nQw9cUMod8SjOt6GQEW-fZCL3qpmXIlGBcVCQbTNgjyNsfrhw66V9_85RAwEihlHWJfbuW6PeDKyz-Kv8Q3IOJs1E1i1jz-SYXgUw4TTMTcWVp9bSdGmprSPCLdK-Jxn8sDhv0kN58__KDpstkVGpLnllfkkATb7EP_z8dy0exB8"
                    />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 rounded-full border border-border-light dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800">
                    <img
                      alt="pinterest icon"
                      className="w-4 h-4 opacity-60"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS5s22XlzBh6u47w60TEhRPxaJhI8jNDgotcIXIHITFv-Vg_oubepuRFSPB6-2VWPWjRwy3_wc2kTKdTPbDx5apEJdGc_3bBpIstZ6XOVu6xVwwcZECwIt5ovyMJiFiwWOyhW69m-njiVNqj_0b2zBsILDvOGhVjy30d6S06VrcBThsV43I9LM80-Wn_Qocc34GNGRD1iS_H0qTzZfsB6aA7xK--IEUEzefvKNswRF5kd9crlcuYgNSd1RxIbbhDSdgAJmIm7ht80"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Tabs for Description, Preview, Reviews --> */}
          <div className="border-t border-border-light dark:border-border-dark pt-8">
            <div className="border-b border-border-light dark:border-border-dark">
              <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                <a
                  className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  href="#"
                >
                  Description
                </a>
                <a
                  className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  href="#"
                >
                  PDF Preview
                </a>
                <a
                  className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  href="#reviews"
                >
                  Reviews (1,283)
                </a>
              </nav>
            </div>
            <div className="py-6">
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Between life and death there is a library, and within that
                  library, the shelves go on forever. Every book provides a
                  chance to try another life you could have lived. To see how
                  things would be if you had made other choices . . . Would you
                  have done anything different, if you had the chance to undo
                  your regrets?
                </p>
                <p>
                  A dazzling novel about all the choices that go into a life
                  well lived, from the internationally bestselling author of How
                  To Stop Time and The Comfort Book.
                </p>
                <a
                  className="text-primary font-medium hover:underline"
                  href="#"
                >
                  Read More...
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Reviews Section --> */}
          <div
            className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col gap-6"
            id="reviews"
          >
            <h2 className="text-2xl font-bold font-heading">
              Reviews &amp; Ratings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3 items-center justify-center bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-border-light dark:border-border-dark">
                <p className="text-5xl font-bold">4.5</p>
                <div className="flex items-center text-amber-500">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined">star_half</span>
                </div>
                <p className="text-sm text-gray-500">Based on 1,283 reviews</p>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-10">5 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">962</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">4 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">192</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">3 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "5%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">64</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">2 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "3%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">38</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">1 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "2%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">27</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold">Showing 3 of 1,283 reviews</p>
              <select className="form-select rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary">
                <option>Most recent</option>
                <option>Highest rating</option>
                <option>Lowest rating</option>
              </select>
            </div>
            <div className="space-y-6">
              {/* <!-- Review Item --> */}
              <div className="flex flex-col gap-3 border-b border-border-light dark:border-border-dark pb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAls6kj6E2oVzORoHfzoN813KHgju12YPcGfbGrL5iG8NMA9ta_Qxtq9tHaWTn0yUQ91hhDov5WbK1gqoEXxhm9w-t-_9pEKY9GGf6lGmP8Q7-mth5k6-UqR71xWqvCfYzz8JWs09xX_jP4eg96z__MhTH3v3z5Aiwy_7F5BXVSpXFRVA3o1m7A2X2SPvNFay9MLDkk01x0ZKJZu2Ja1xDOOHM3Q3XZDni0AAuWN96ujdHfObikhqvJwjQiYVNO61qh6uvusydtadw")',
                    }}
                  ></div>
                  <div>
                    <p className="font-bold">Jane S.</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-500">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  An absolutely stunning and thought-provoking novel. I couldn't
                  put it down. The concept is brilliant and the execution is
                  flawless. A must-read for anyone who's ever wondered 'what
                  if?'.
                </p>
              </div>
              {/* <!-- Review Item --> */}
              <div className="flex flex-col gap-3 border-b border-border-light dark:border-border-dark pb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAls6kj6E2oVzORoHfzoN813KHgju12YPcGfbGrL5iG8NMA9ta_Qxtq9tHaWTn0yUQ91hhDov5WbK1gqoEXxhm9w-t-_9pEKY9GGf6lGmP8Q7-mth5k6-UqR71xWqvCfYzz8JWs09xX_jP4eg96z__MhTH3v3z5Aiwy_7F5BXVSpXFRVA3o1m7A2X2SPvNFay9MLDkk01x0ZKJZu2Ja1xDOOHM3Q3XZDni0AAuWN96ujdHfObikhqvJwjQiYVNO61qh6uvusydtadw")',
                    }}
                  ></div>
                  <div>
                    <p className="font-bold">Mark B.</p>
                    <p className="text-xs text-gray-500">1 month ago</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-500">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined text-base">
                    star
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Enjoyed it, but felt the ending was a bit predictable. Still,
                  a very creative and engaging story that makes you reflect on
                  your own life choices.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Related Books Section --> */}
          <div className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold font-heading">Related Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for The Humans"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy0YW_uziHJUiEbsRDeZ4JWydPvF2gcNCdbSF_n5VJ5PsXUszaZybBP9SGzn25jM7NQofx_YoL7dSj3_p_DuFmfWsaj78cwusKMFwIuIquSzDnPgSCjSfstIJWriN96gmShUavNPElVWyixu8Ew0BlWm-sFG0itMoFW3mm0JkBY4HXX78fZFIYKot-RhW5nYy8TWm0YTYzWDUc6ApZPNmsrA7AwtNm8NFTszvJ6odpfNJO3j5j2jTgfBaWTYrowp9B8WSmCvC4HFk"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    The Humans
                  </h3>
                  <p className="text-xs text-gray-500">Matt Haig</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for How to Stop Time"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgsteoWPW4dA4aeNYL2ITMTH4XVeeDTcUa3nHFe6hKhOlMGpnXIkL25N_Ggoh4qimXBSGeRNEsn0xuSHTXc-fHNaw_zRJx-LOFl5ZGuRk8qZNMhIwm6FmDyM7kPMT8_sYdwuLxphtvkGWbX6KmYievHl64751-ydDpN8WsbEH-neXO8pBIQKCdlSO6Lgl2jikwSWxxs9J4LNE6ihbGH5CFYxranBBb6mtDHPGq5s6jCjJdIVl2pMYhoMjJdVNuf7VSg74AKa5WFwg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    How to Stop Time
                  </h3>
                  <p className="text-xs text-gray-500">Matt Haig</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for The Invisible Life of Addie LaRue"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGhSOkSc90TI3qci5yFasa3IixYOfz9O7IH1lGMpKmNjF_2sPCGURwTbEKzblcLsPWAWgBzC3DHNCIczDlBw-53GZrVYmT7Q5S53x-sg2efBilS6QPn1aN--ly1oCN3LBEyyQShm_AbY-VyEo8oNJx0Z85uu-4BPh3rUL2IL16IhtXR7P5S2Mlq8-oC-OsE9J0EXbhZY6coI7qX9x3HMD5j3NS6rJogU6myaeFEfmEKCLf1WEu2vCV7FI3_fKtLltfRmqAOvuyfAI"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    The Invisible Life of Addie LaRue
                  </h3>
                  <p className="text-xs text-gray-500">V.E. Schwab</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for Project Hail Mary"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEdzfqauzlHyFk-TBBxIzIrcR7lQfhvRgKdu7zTD_TncIlOhkgSw8gpF_LawKbdSSVTeVdZqNsKZcTACRljSN2aETDe1Cm_JfkgA8oZtOhRT7irrJGJLiE5NNW_ZhmxHwH-CuD2l-tfZgN6XZvYSo69lN_cJklIuufqVeklPEjUVuac5qD9qw-DTSAQ4tlpejwFDDgkP8ls1jwqrXaD_cCpNJyFR4_ZG1m3WkD0trjDwGkgfwA-kIoQFn-Go_tnxzNZLHwvh1cxSM"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    Project Hail Mary
                  </h3>
                  <p className="text-xs text-gray-500">Andy Weir</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for Circe"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt97eDghVBEe-4wz1PBfwuoCFt4pu0dLdfE2qqojSR2DIRCpX4NqCgEtb2cyNfeE1-Yj75KqG4r4kDmvoIHiItNA5vOeqPznhypm3uOabYg48QJlk_Jmt79HVZm4MvMFkExrRKK3FCKYENtJpgFXFRnPfJjI2xW8L6jB58jByoI3-VwQmG3Ph7CR8gHQ3W8g0qaj-eUnMv3WxclhPhIeiHPHDtdcKT3VBZSh9GgEsKRObLBJKdhfbLDfM9SeIYsFQg6oxWzC_eT08"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    Circe
                  </h3>
                  <p className="text-xs text-gray-500">Madeline Miller</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailPage;
