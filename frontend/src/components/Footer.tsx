const Footer = () => {
  return (
    //  <!-- Footer -->
    <footer className="bg-text-light dark:bg-background-dark border-t border-border-light dark:border-border-dark">
      <div className="container mx-auto px-4 py-10 text-background-light dark:text-text-dark/70">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="#">
                  Categories
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Best Sellers
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  New Releases
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a className="hover:opacity-80" href="#">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a className="hover:opacity-80" href="#">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a className="hover:opacity-80" href="#">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.792 2.013 10.146 2 12.315 2zm-1.161 4.573a.75.75 0 01.75.75v1.506a.75.75 0 01-1.5 0V7.323a.75.75 0 01.75-.75zM12 9.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zM12 16.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-background-light/20 dark:border-text-dark/20 pt-6 text-center text-sm">
          <p>© 2024 Bookstore. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
