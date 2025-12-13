import { useNavigate } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex">
          {/* <!-- SideNavBar --> */}
          <aside className="w-64 flex-shrink-0 p-6 bg-background-light hidden md:block  ">
            <div className="flex flex-col gap-8 shadow-sm p-4 bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark ">
              <div className="flex items-center gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                  data-alt="User profile picture"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvD-0XQYPGv_MADtOUbhQKVexag3WyuWft5bWTQk7Olcj4PynoJSQwlPhsTO0nG5WIWGs2FwO4igwSr1URYMMLDSWo40R5BUiV2ExwbliSC_v0Jz-oNVWaKZ6lcL9H3tNQp6UX34Le1eQ_wA2FjVhVgFXl-u0AjAhYdQXC2Rssch1IWpgUUGXwHE3NWGMV63xVXxsBA1RchU_Ab7tuCjr60X3Wq2dLb8dQ_xR5ZGcKin0sT8E2ZQNSprk-BcGISpOX-HWw2J_A7mLv")',
                  }}
                ></div>
                <div className="flex flex-col ">
                  <h1 className="text-text-light dark:text-text-dark text-base font-bold leading-normal">
                    Alex Doe
                  </h1>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                    alex.doe@email.com
                  </p>
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 dark:bg-primary/30"
                  href="#"
                >
                  <span className="material-symbols-outlined fill text-primary">
                    person
                  </span>
                  <p className="text-primary text-sm font-bold leading-normal">
                    Profile
                  </p>
                </a>
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  href="address-management"
                >
                  <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
                    home_pin
                  </span>
                  <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                    Addresses
                  </p>
                </a>
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  href="/account/order-history"
                >
                  <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
                    receipt_long
                  </span>
                  <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                    Order History
                  </p>
                </a>
                {/* wishlist */}
                {/* <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
                    favorite
                  </span>
                  <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                    Wishlist
                  </p>
                </a> */}
                {/* notification */}
                {/* <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
                    notifications
                  </span>
                  <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                    Notifications
                  </p>
                </a> */}
                {/* chat support */}
                {/* <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
                    support_agent
                  </span>
                  <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                    Chat Support
                  </p>
                </a> */}
                {/* setting */}
                {/* <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
                    settings
                  </span>
                  <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                    Settings
                  </p>
                </a> */}
                <div className="border-t border-border-light dark:border-border-dark">
                  <a
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors mt-4"
                  >
                    <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
                      logout
                    </span>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                      Logout
                    </p>
                  </a>
                </div>
              </nav>
            </div>
          </aside>
          {/* <!-- Main Content --> */}
          <main className="flex-1 p-6 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col gap-6">
              {/* <!-- PageHeading --> */}
              <header className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black font-heading leading-tight tracking-tight">
                  Profile Dashboard
                </h1>
              </header>
              {/* <!-- Personal Information Card --> */}
              <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                <h2 className="text-text-light dark:text-text-dark text-2xl font-bold font-heading leading-tight tracking-tight pb-6 flex justify-center md:justify-between">
                  PERSONAL INFORMATION
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Full Name
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal"
                      // readOnly={true}
                      value="Alex Doe"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Email
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal"
                      //   readonly=""
                      value="alex.doe@email.com"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Phone
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal"
                      //   readonly=""
                      value="+1 (555) 123-4567"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Birthday
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal"
                      //   readonly=""
                      type="date"
                      value="1990-05-15"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Gender
                    </p>
                    <select
                      className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal"
                      //   disabled=""
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option
                      //   selected=""
                      >
                        Prefer not to say
                      </option>
                    </select>
                  </label>
                </form>
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border-light dark:border-border-dark">
                  <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-primary border border-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                    Edit Profile
                  </button>
                  <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors">
                    Save Changes
                  </button>
                  <button className="ml-auto text-sm font-semibold text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors">
                    Change Password
                  </button>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
