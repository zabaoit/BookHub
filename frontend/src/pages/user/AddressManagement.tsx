import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideNavBarProfile from "../../components/SideNavBarProfile";

const AddressManagement = () => {
  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex">
          {/* <!-- SideNavBar --> */}
          <SideNavBarProfile />

          {/* <!-- Main Content --> */}
          <main className="flex-1 p-6 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col gap-6">
              {/* <!-- PageHeading --> */}
              <header className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black font-heading leading-tight tracking-tight">
                  Address Management
                </h1>
              </header>
              <div className="flex flex-col gap-4">
                {/* <!-- ListItem 1 (Default Address) --> */}
                <div className="flex flex-col gap-2 bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-4 justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-primary dark:text-primary/80 flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                        <span className="material-symbols-outlined">home</span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[#111318] dark:text-gray-200 text-base font-bold leading-normal">
                            Eleanor Vance
                          </p>
                          <span className="inline-flex items-center rounded-full bg-green-200 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                            Default
                          </span>
                        </div>
                        <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">
                          123 Merriweather Lane, Apt 4B
                        </p>
                        <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">
                          Booksville, Readerland, 12345, United States
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- ButtonGroup --> */}
                  <div className="flex justify-end pt-2">
                    <div className="flex flex-1 gap-3 flex-wrap justify-end">
                      <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-9 px-3 bg-gray-100 dark:bg-gray-700 text-[#111318] dark:text-gray-200 text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-600">
                        <span className="truncate">Edit</span>
                      </button>
                      <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-9 px-3 bg-transparent text-red-500 text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-destructive/10">
                        <span className="truncate">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- ListItem 2 --> */}
                <div className="flex flex-col gap-2 bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-4 justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-[#111318] dark:text-gray-300 flex items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-gray-700 shrink-0 size-12">
                        <span className="material-symbols-outlined">
                          business_center
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="text-[#111318] dark:text-gray-200 text-base font-bold leading-normal mb-1">
                          Eleanor Vance
                        </p>
                        <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">
                          456 Inter Street, Suite 200
                        </p>
                        <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">
                          Typeface City, Fontland, 67890, United States
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- ButtonGroup --> */}
                  <div className="flex justify-end pt-2">
                    <div className="flex flex-1 gap-3 flex-wrap justify-end">
                      <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-9 px-3 text-blue-400 text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-action-blue/10">
                        <span className="truncate">Set as Default</span>
                      </button>
                      <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-9 px-3 bg-gray-100 dark:bg-gray-700 text-[#111318] dark:text-gray-200 text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-600">
                        <span className="truncate">Edit</span>
                      </button>
                      <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-9 px-3 bg-transparent text-red-500 text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-destructive/10">
                        <span className="truncate">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Empty State Example (commented out) --> */}
              {/* <!-- */}
              {/* <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg mt-6">
                <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500 mb-4">
                  location_off
                </span>
                <h3 className="text-xl font-bold font-heading text-[#111318] dark:text-gray-200">
                  No Saved Addresses
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6 max-w-sm">
                  You haven't added any addresses yet. Add one now to make
                  checkout faster!
                </p>
                <button className="flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                  <span className="material-symbols-outlined">
                    add_location_alt
                  </span>
                  <span className="truncate">Add Your First Address</span>
                </button>
              </div> */}
              {/* --> */}
              {/* <!-- Add New Address Button --> */}
              <div className="mt-8">
                <button className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className="material-symbols-outlined">add</span>
                  <span className="truncate">Add New Address</span>
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

export default AddressManagement;

