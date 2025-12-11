const FeaturedSection = () => {
  return (
    <section>
      <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Sách mới nhất (Newest Books)
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <!-- Book Card --> */}
        <div className="flex flex-col rounded-lg bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm transition hover:shadow-xl">
          <img
            className="h-64 w-full object-cover"
            data-alt="A book cover with a vintage, abstract design."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVtg9jDmI76RSLoaayoDHF5BLeOMQ6o8aw_BqTBGkCkSQTudNtSFxPJ5zA-uaeFMt3sSXS8Z3EOH3CMugmamaNejBAULBO38NKLDSIpfKeY4-VkFEpwx2aaH2yR3GY3xdV6cb7n4vLTpxNrJ8gXAStHoG05BhpGnTqmeH-0utntUS0NklVoQpOCF2T9omi0mOx9M8t6tUJYZ4LfImrmjFwQzy6yy7sf0teIvH3hPo0omi5rpkyGsx99kmB92dsCX1AHrmWHMmAnsj-"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
              The Midnight Library
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Matt Haig
            </p>
            <p className="text-lg font-bold text-primary mt-auto">$15.99</p>
          </div>
          <button className="w-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-white/80 py-2.5 font-bold text-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
            Add to Cart
          </button>
        </div>
        {/* <!-- Book Card --> */}
        <div className="flex flex-col rounded-lg bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm transition hover:shadow-xl">
          <img
            className="h-64 w-full object-cover"
            data-alt="A book with a plain white cover and black title text."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVhzeGXotcfdsBC1aZTizZJXjNhabOVCIclYAAgbSu7Jq4rl9Nb9FapKdlFjv3QGhwN4cvC0lfvDrm-XhA8RmglCMX5h3xkfixvcbIBVYdGxk5aN8MRRwXpKRg6VX03-0hz5y-PlycmsV3B_P-qwG6Zr1NtofHjbeTNAweheX7cEHw3PcTBinz_WYXsB7ruj3sorxV5tH33iEyEH1PH1xl95SydYMDUvhnuR_w-_URruh9FbTlDP_YjZ-78YxEcrMiM_Ebk5IM1MBs"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
              Project Hail Mary
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Andy Weir
            </p>
            <p className="text-lg font-bold text-primary mt-auto">$18.50</p>
          </div>
          <button className="w-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-white/80 py-2.5 font-bold text-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
            Add to Cart
          </button>
        </div>
        {/* <!-- Book Card --> */}
        <div className="flex flex-col rounded-lg bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm transition hover:shadow-xl">
          <img
            className="h-64 w-full object-cover"
            data-alt="A person holding a book with a yellow cover and floral illustrations."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQabeHmLjH8EIlsRx_bzNetBp4hN02d6oqrrVwdrHWr3IKxunUo8xUNB7gBtn-mnoXqdhcPWySO5TgonrkTEPDWxx6xA5dgZVbpYIWUKZYu9rKPjpSKo5LVG5pMsz-ZBJNC8E-qE4svasHK_fb7H7FEAmUggmIEYVc8wizOgN0vV4dGV8MFRDV-Tc17izo5XV-VK79l5gw9N0tSnpGk4ZJc-V2Kzxtr_NZrE85mG4CRiqgDu87bWO4mn0QlyhDFRv2YHKoIk2ujsig"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
              Klara and the Sun
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Kazuo Ishiguro
            </p>
            <p className="text-lg font-bold text-primary mt-auto">$14.00</p>
          </div>
          <button className="w-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-white/80 py-2.5 font-bold text-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
            Add to Cart
          </button>
        </div>
        {/* <!-- Book Card --> */}
        <div className="flex flex-col rounded-lg bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm transition hover:shadow-xl">
          <img
            className="h-64 w-full object-cover"
            data-alt="A stack of three books with simple colored covers."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj9LL8Cig5AjmXknVlsdRdQIgBUmDGXOCGXp1ioQpKJaxxsTotrSGkS6BA7xRBw2xJnBaUZasu4zDjGOhDOhQ_9GaTWc2c5Yh-27RLthuow8rm_qDAl3eOpKiFk0VrR313Mo9bleqXd2OjsEbbI5jWrdEz4eR-OsRNHaG8oILZrbiq4I-_DiemzvYmkbjRxLlkqdF-hwJh1oe2y5wJUIQRRooZAS0pOz0Iu0GnoLHYPR412AD8iRprrYKqmwGvsUU7K2kxQoHAZlkd"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
              The Vanishing Half
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Brit Bennett
            </p>
            <p className="text-lg font-bold text-primary mt-auto">$16.20</p>
          </div>
          <button className="w-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-white/80 py-2.5 font-bold text-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
