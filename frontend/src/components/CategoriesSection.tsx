const CategoriesSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="font-heading text-text-light dark:text-text-dark text-3xl font-bold leading-tight tracking-tight mb-6">
        Explore by Category
      </h2>
      {/* <!-- ImageGrid --> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="group relative bg-cover bg-center flex flex-col rounded-lg justify-end p-4 aspect-[3/4] overflow-hidden"
          data-alt="A stack of classNameic fiction novels."
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAooGBRsjGEn7kIZe-rD6fKFGiKjXtxLw5jFlV693WHGIoJtcKI8DJNSKAsvwKE0A43dqD6Rb9ZZHctRyAz139ESsaGJGHYy55YYXSJ841F2FbSrnxt2zdVtao_RvXWEgS4CiSgH38zieefz45zT_ncH0qrXQqi5gbv0bUz2NCIevw_iicxgkmmTPwwgVY7Bm2Kuo_hHuS8OwUZHvjLqK0ao5IS6a7jArDVUN7WrsIeELipx_HeRbPggI-nBYwCc5nOmTpOl2F6jI");',
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <img
            alt="A stack of classNameic fiction novels."
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMZEp25x9mxOVjQwsOEFilUsUX4-91fLVfiBU0G8Eu_3C5xV-Y8dnOvKz07keSloo-DuijfVq_0vv_xceQLJ2EIpaCo5wlF-jU-M2oPy9-O_ibwq1vrJNhRR81hSaA4EvlkBhqOxNelHT5fzf8IlbH_k0CL0elBwrYts5OUycgir3yhYceWat-EUNDxGIj-SmGABF6f4YmvapBA6xW-_EMLKJQz-nqPYH2-B-l2VHu294WZ7JmBoXm3HF2jH3dUNOpakk2pWcrZLE"
          />
          <p className="relative z-10 text-white text-xl font-bold leading-tight">
            Fiction
          </p>
        </div>
        <div
          className="group relative bg-cover bg-center flex flex-col rounded-lg justify-end p-4 aspect-[3/4] overflow-hidden"
          data-alt="A microscope and beakers in a science lab."
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZPthYCzrbhepwzcrCnN9r8KVnmls8W7tT8o64dJxnNoqcX5__o7nPDPeTkQnJs8qTf22Sb3FQ75bRXqf9TQI1vCw8VYF2-6Gakt2vaFd2vO1BbYt5yvpEI-Rx5G1upC0Q1aYbOSNpZZQQPrDRM_CE6DIJi5Tpqe2wNNvbMFRiQsznN5aMSZwryO4pP24532rlYMVtlO-m6btwPhWhrHK2l7X0ZBJi-s1lqhJHEFJ8Mz4fkHfzhBWaJTZzY1jC-Of4rKuEgCVV9ec")',
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <img
            alt="A microscope and beakers in a science lab."
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ht5F6qacc71HKtWoYRG1Oa8ryUi1mOZQg0Qx_YO8__2C6gS4imMPogvWhWds_bePIs77Eyon-M0dUSTO0f0LgCNE0T_S-zfuE9NZbjxU1x6rmgnxBOGkCGQ2gKJcAbeoILR71dhpE2EUXMAwSzbuxJPGd20CIxCSA1rTheOXzxXWVRovQUrEBy6d6QT2qMm4_9ro4DHiCO4822sX9pO93daUmoJcMD61FVDnnbJVtPOzjOyBl6lNvLYNjUMinHCVBeAZmENhK2U"
          />
          <p className="relative z-10 text-white text-xl font-bold leading-tight">
            Science
          </p>
        </div>
        <div
          className="group relative bg-cover bg-center flex flex-col rounded-lg justify-end p-4 aspect-[3/4] overflow-hidden"
          data-alt="An old map and historical artifacts."
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrlhXj1NpzJvw63p7v071Nsx-6Pcise-FC6AA4zogjOcTyQTdAfXjZR5fY0xOP27ZxeKioVLzszdM1xjo8FBeLx9hpWnC0svXI58gXbOndZG9UqHZNE3sOoUEccqLTZVsx1RTEVZSX9EYbe_g7d0SgZ-LahkpyrPVos1xmajrqnIPdZDwlnTdQr1HANZbQzsP0w7MiRWHGIXfPcjlqaT11vmDhgXJITqm2FGxi0fobBbin0M5bq4tKzflME8Kyn52285JdfWjwxIU");',
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <img
            alt="An old map and historical artifacts."
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX3iMFkKyMeuqlBbC-_zHif3R-FFaNYXeTKSMlwkWciU85Ap-KNUKPQZgh7KMMrPGkdZN2nJki_SuSLiWIFF7zAdR51-_mfhOSAq4v7kjIXNMRni2F5wJqOpiOyxKRJtBzc7eX4h3t2qIjXi3bD6gIDuOOilDp-3HWTieFXOmUfmlvR_e_ZRoMNiKkJOTGmtYLaQ37vWD2Xr_fLXve23tepk6xGfm4GTPczMhlwxUzeSg1pWgZWwyTVOyg0M-1w_cNC6ed7FKCwwg"
          />
          <p className="relative z-10 text-white text-xl font-bold leading-tight">
            History
          </p>
        </div>
        <div
          className="group relative bg-cover bg-center flex flex-col rounded-lg justify-end p-4 aspect-[3/4] overflow-hidden"
          data-alt="Colorful illustrations from a children's book."
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDeulm_K8_DnO2NPYgyh4mAZuK3uQiBEocClxk_RQYRbfTi9o43l1bvBjQzOXLUYPlOsw0AogkZ3V60tqHYHqTOr4K840K2H7HjAAfF01KEXtInCcgt6Q3y8eMUAnHE7TlaUnRIwA2c28SxfzXQeoseZbZhsCKzSCmDZ5u9gBLg_fSUhxwRkhgV6SleaMIE1oxrxufGIpf0KCD6ZrwpPFmpAjqrEmlIouh2o7EmFs_AFQAygkkwKIIduR9dxGdG6SLW4-sYzsZBkZQ");',
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <img
            alt="Colorful illustrations from a children's book."
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD0NGXiT0jXNSW292iTcezKDreKthtRUOXbt0TKYrk7rK47oAxjNQimNbz3iPKWLLrWd1TRvf3cOUSLGNYGXotZhcoAK_rgwGgrPnywnwHLkUepDa4XtK8_M4yrTYtMLsrF27pCUV1vOGRLlhCHZKr-d4deN4wsVvZg1REdBDLTxw9RxvZ8JMyipwQKSq8eHKhxDXNRTae0jpyX8vx47pyYENkWVfjIburJX9h6MH1fT3UfBxMkdj-DEoIy8PAcXwx7O2gNphsR3k"
          />
          <p className="relative z-10 text-white text-xl font-bold leading-tight">
            Children's Books
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
