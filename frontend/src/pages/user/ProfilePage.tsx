import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useAuthStore from "../../store/useAuthStore";
import SideNavBarProfile from "../../components/SideNavBarProfile";

const ProfilePage = () => {
  const { user } = useAuthStore();
  console.log("User in ProfilePage:", user);

  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex">
          {/* <!-- SideNavBar --> */}
          <SideNavBarProfile />
          {/* <!-- Main Content --> */}
          <main className="flex-1 p-6 bg-background">
            <div className="flex flex-col gap-6">
              {/* <!-- PageHeading --> */}
              <header className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                <h1 className="text-foreground text-4xl font-black font-heading leading-tight tracking-tight">
                  Profile Dashboard
                </h1>
              </header>
              {/* <!-- Personal Information Card --> */}
              <section className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <h2 className="text-card-foreground text-2xl font-bold font-heading leading-tight tracking-tight pb-6 flex justify-center md:justify-between">
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
                      value={user?.username}
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Email
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal"
                      //   readonly=""
                      value={user?.email}
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Phone
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal"
                      //   readonly=""
                      value=""
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
