const SaleBanner = () => {
  return (
    <section className="w-full bg-secondary py-8 my-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="text-center md:text-left">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
            Flash Sale!
          </h2>
          <p className="text-lg text-secondary-foreground">
            Limited Time: 25% Off All Fiction!
          </p>
        </div>
        {/* <!-- Timer --> */}
        <div className="flex gap-2 sm:gap-4">
          <div className="flex w-20 flex-col items-stretch gap-2">
            <div className="flex h-16 sm:h-20 items-center justify-center rounded-lg bg-card">
              <p className="font-heading text-3xl sm:text-4xl font-bold">02</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm font-normal leading-normal">Days</p>
            </div>
          </div>
          <div className="flex w-20 flex-col items-stretch gap-2">
            <div className="flex h-16 sm:h-20 items-center justify-center rounded-lg bg-card">
              <p className="font-heading text-3xl sm:text-4xl font-bold">12</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm font-normal leading-normal">Hours</p>
            </div>
          </div>
          <div className="flex w-20 flex-col items-stretch gap-2">
            <div className="flex h-16 sm:h-20 items-center justify-center rounded-lg bg-card">
              <p className="font-heading text-3xl sm:text-4xl font-bold">45</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm font-normal leading-normal">Minutes</p>
            </div>
          </div>
          <div className="flex w-20 flex-col items-stretch gap-2">
            <div className="flex h-16 sm:h-20 items-center justify-center rounded-lg bg-card">
              <p className="font-heading text-3xl sm:text-4xl font-bold">33</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm font-normal leading-normal">Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;

