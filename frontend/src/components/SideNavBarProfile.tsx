import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

const SideNavBarProfile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 8) {
        setIsMobileNavVisible(true);
      } else {
        setIsMobileNavVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-[0_-6px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${isMobileNavVisible ? "translate-y-0" : "translate-y-full"}`}>
        <nav className="grid grid-cols-5">
          <Link
            className={`flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              isActive("/account/profile") ? "text-primary" : "text-text-muted-light dark:text-text-muted-dark"
            }`}
            to="/account/profile"
          >
            <span className={`material-symbols-outlined text-[22px] ${isActive("/account/profile") ? "fill" : ""}`}>
              person
            </span>
            <span className="text-[11px] font-medium">Profile</span>
          </Link>

          <Link
            className={`flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              isActive("/account/address-management") ? "text-primary" : "text-text-muted-light dark:text-text-muted-dark"
            }`}
            to="/account/address-management"
          >
            <span className={`material-symbols-outlined text-[22px] ${isActive("/account/address-management") ? "fill" : ""}`}>
              home_pin
            </span>
            <span className="text-[11px] font-medium">Address</span>
          </Link>

          <Link
            className={`flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              isActive("/account/order-history") ? "text-primary" : "text-text-muted-light dark:text-text-muted-dark"
            }`}
            to="/account/order-history"
          >
            <span className={`material-symbols-outlined text-[22px] ${isActive("/account/order-history") ? "fill" : ""}`}>
              receipt_long
            </span>
            <span className="text-[11px] font-medium">Orders</span>
          </Link>

          <Link
            className={`flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              isActive("/account/wishlist") ? "text-primary" : "text-text-muted-light dark:text-text-muted-dark"
            }`}
            to="/account/wishlist"
          >
            <span className={`material-symbols-outlined text-[22px] ${isActive("/account/wishlist") ? "fill" : ""}`}>
              favorite
            </span>
            <span className="text-[11px] font-medium">Wishlist</span>
          </Link>

          <button
            className="flex flex-col items-center justify-center gap-1 py-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
            onClick={handleLogout}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="text-[11px] font-medium">Logout</span>
          </button>
        </nav>
      </div>

      <aside className="w-64 flex-shrink-0 p-6  hidden md:block  ">
        <div className="flex flex-col gap-8 shadow-sm p-4 bg-card rounded-lg border border-border ">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
              data-alt="User profile picture"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvD-0XQYPGv_MADtOUbhQKVexag3WyuWft5bWTQk7Olcj4PynoJSQwlPhsTO0nG5WIWGs2FwO4igwSr1URYMMLDSWo40R5BUiV2ExwbliSC_v0Jz-oNVWaKZ6lcL9H3tNQp6UX34Le1eQ_wA2FjVhVgFXl-u0AjAhYdQXC2Rssch1IWpgUUGXwHE3NWGMV63xVXxsBA1RchU_Ab7tuCjr60X3Wq2dLb8dQ_xR5ZGcKin0sT8E2ZQNSprk-BcGISpOX-HWw2J_A7mLv")',
              }}
            ></div>
            <div className="flex min-w-0 flex-col">
              <h1 className="text-card-foreground text-base font-bold leading-normal truncate">
                {user?.username}
              </h1>
              <p className="min-w-0 truncate text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                {user?.email}
              </p>
            </div>
          </div>
          {user?.role === "ADMIN" && (
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
              >
                <span className="material-symbols-outlined text-[18px] fill">admin_panel_settings</span>
                Admin
              </Link>
            </div>
          )}
          <nav className="flex flex-col gap-2">
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/account/profile")
                  ? "bg-primary/20 dark:bg-primary/30"
                  : "hover:bg-primary/10 dark:hover:bg-primary/20"
              }`}
              to="/account/profile"
            >
              <span className={`material-symbols-outlined ${isActive("/account/profile") ? "fill text-primary" : "text-text-muted-light dark:text-text-muted-dark"}`}>
                person
              </span>
              <p className={`text-sm leading-normal ${isActive("/account/profile") ? "text-primary font-bold" : "text-text-light dark:text-text-dark font-medium"}`}>
                Profile
              </p>
            </Link>

            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/account/address-management")
                  ? "bg-primary/20 dark:bg-primary/30"
                  : "hover:bg-primary/10 dark:hover:bg-primary/20"
              }`}
              to="/account/address-management"
            >
              <span className={`material-symbols-outlined ${isActive("/account/address-management") ? "fill text-primary" : "text-text-muted-light dark:text-text-muted-dark"}`}>
                home_pin
              </span>
              <p className={`text-sm leading-normal ${isActive("/account/address-management") ? "text-primary font-bold" : "text-text-light dark:text-text-dark font-medium"}`}>
                Addresses
              </p>
            </Link>

            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/account/order-history")
                  ? "bg-primary/20 dark:bg-primary/30"
                  : "hover:bg-primary/10 dark:hover:bg-primary/20"
              }`}
              to="/account/order-history"
            >
              <span className={`material-symbols-outlined ${isActive("/account/order-history") ? "fill text-primary" : "text-text-muted-light dark:text-text-muted-dark"}`}>
                receipt_long
              </span>
              <p className={`text-sm leading-normal ${isActive("/account/order-history") ? "text-primary font-bold" : "text-text-light dark:text-text-dark font-medium"}`}>
                Order History
              </p>
            </Link>

            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/account/wishlist")
                  ? "bg-primary/20 dark:bg-primary/30"
                  : "hover:bg-primary/10 dark:hover:bg-primary/20"
              }`}
              to="/account/wishlist"
            >
              <span className={`material-symbols-outlined ${isActive("/account/wishlist") ? "fill text-primary" : "text-text-muted-light dark:text-text-muted-dark"}`}>
                favorite
              </span>
              <p className={`text-sm leading-normal ${isActive("/account/wishlist") ? "text-primary font-bold" : "text-text-light dark:text-text-dark font-medium"}`}>
                Wishlist
              </p>
            </Link>
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
                className="flex hover:cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors mt-4"
                onClick={handleLogout}
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
    </div>
  );
};

export default SideNavBarProfile;
