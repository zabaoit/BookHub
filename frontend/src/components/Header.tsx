import { Link } from "react-router";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

const Header = () => {
  const { user } = useAuthStore();
  const { items, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const cartItemCount = items.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    // <!-- TopNavBar -->
    <header className="w-full bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border px-2 sm:px-6 lg:px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-foreground">
              <span className="material-symbols-outlined text-3xl text-primary">
                auto_stories
              </span>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] font-display">
                BookHub
              </h2>
            </div>
            <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-muted-foreground flex border-none bg-input items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border-none bg-input focus:border-none h-full placeholder:text-muted-foreground px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal font-body"
                  placeholder="Search"
                  onChange={() => { }}
                />
              </div>
            </label>
          </div>

          {/* right */}
          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-8">
            <div className="hidden lg:flex items-center gap-6 sm:gap-9">
              <Link
                className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
                to="/booklist"
              >
                Book
              </Link>

              <Link
                className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors"
                to="/about"
              >
                About
              </Link>
            </div>
            <div className="flex gap-2">
              <Link to="/cart">
                <button className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900 border-none">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </button>
              </Link>

              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            {user ? (
              // profile
              <Link
                to="/account/profile"
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="User profile picture"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWCkSpJt2C6SAgxeNHQ8LTIE06T2xWLMTSiw2LfRR9QT0e4UGqUSXX-6HDBKLoDw6yA1JfQGK_xZMWk3tvjhRVBtFq6v3ADYrv8hS4kPnvgxsotBAI90X8jRCNdcxGCTsP-Wkvoymq9_tTkJQvZzfKO1UlId3NW1m0rCxXNqCZgsWUMZ91hAYjP8ifvDpxcEZ9U7ThbL22JJelBVZeLSrXSqjkezascMPqKF8jJeRBzOYxlVPzk4DCM8WkPwixJkPhaGFnOTkHWr0")',
                }}
              ></Link>
            ) : (
              // signin
              <Link to="/signin">
                <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                  <span className="truncate hover:text-primary">Sign In</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

