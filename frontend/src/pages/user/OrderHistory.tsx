import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideNavBarProfile from "../../components/SideNavBarProfile";

const OrderHistory = () => {
  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex ">
          {/* <!-- SideNavBar --> */}
          <SideNavBarProfile />
          {/* <!-- Main Content --> */}
          <main className="flex-1 min-w-0 p-6 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col overflow-x-hidden">
              {/* <!-- PageHeading --> */}
              <div className="flex flex-wrap justify-between gap-3">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black font-heading leading-tight tracking-[-0.033em]">
                  Order History
                </h1>
              </div>
              {/* <!-- Filters & Search --> */}
              <div className="flex flex-col md:flex-row gap-6 justify-between py-4">
                {/* <!-- Chips --> */}
                <div className="flex gap-2 p-1 overflow-x-auto">
                  <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 bg-primary text-white">
                    <p className="text-sm font-medium leading-normal">All</p>
                  </button>
                  <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                      Pending
                    </p>
                  </button>
                  <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                      Shipped
                    </p>
                  </button>
                  <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                      Delivered
                    </p>
                  </button>
                  <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                      Cancelled
                    </p>
                  </button>
                </div>
                {/* <!-- SearchBar --> */}
                <div className="w-full md:w-80">
                  <label className="flex flex-col h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-background-dark border border-border-light dark:border-border-dark">
                      <div className="text-subtle-light dark:text-subtle-dark flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-background-dark h-full placeholder:text-subtle-light dark:placeholder:text-subtle-dark px-4 pl-2 text-base font-normal leading-normal"
                        placeholder="Search by Order ID or date..."
                        value=""
                      />
                    </div>
                  </label>
                </div>
              </div>
              {/* <!-- Table --> */}

              <div className="mt-3 overflow-x-auto rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-background-dark">
                <table className="w-full border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-background-light/50 dark:bg-background-dark/50">
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-border-light dark:border-t-border-dark">
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        #12345
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        Oct 26, 2023
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        $75.50
                      </td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-success"></span>
                          <span className="text-text-light dark:text-text-dark">
                            Delivered
                          </span>
                        </div>
                      </td>
                      <td className="h-[72px] px-4 py-2 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:underline cursor-pointer">
                        View Details
                      </td>
                    </tr>
                    <tr className="border-t border-t-border-light dark:border-t-border-dark">
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        #12344
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        Oct 15, 2023
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        $42.00
                      </td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-success"></span>
                          <span className="text-text-light dark:text-text-dark">
                            Delivered
                          </span>
                        </div>
                      </td>
                      <td className="h-[72px] px-4 py-2 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:underline cursor-pointer">
                        View Details
                      </td>
                    </tr>
                    <tr className="border-t border-t-border-light dark:border-t-border-dark">
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        #12343
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        Sep 30, 2023
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        $112.99
                      </td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-error"></span>
                          <span className="text-text-light dark:text-text-dark">
                            Cancelled
                          </span>
                        </div>
                      </td>
                      <td className="h-[72px] px-4 py-2 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:underline cursor-pointer">
                        View Details
                      </td>
                    </tr>
                    <tr className="border-t border-t-border-light dark:border-t-border-dark">
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        #12342
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        Sep 05, 2023
                      </td>
                      <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                        $25.10
                      </td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-warning"></span>
                          <span className="text-text-light dark:text-text-dark">
                            Shipped
                          </span>
                        </div>
                      </td>
                      <td className="h-[72px] px-4 py-2 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:underline cursor-pointer">
                        View Details
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <!-- Pagination --> */}
              <div className="flex justify-center items-center gap-2 pt-6">
                <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10">
                  <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                    chevron_left
                  </span>
                </button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-white">
                  1
                </button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10 text-text-light dark:text-text-dark">
                  2
                </button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10 text-text-light dark:text-text-dark">
                  3
                </button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10">
                  <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
