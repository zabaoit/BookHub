const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div
        className="flex min-h-[480px] flex-col gap-8 rounded-xl items-start justify-center text-center bg-cover bg-center bg-no-repeat p-10"
        data-alt="A cozy, warm-lit library with floor-to-ceiling bookshelves"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRpiMHb-ohFNYxVYcMNbN1ousKetK2a3Idj2dkDGjQgcaRZghpHt4aqXELmbtlQrHSDQSaZiJKmzQkpV7AKj7k4EZYu45O9xwB8N2yYw8VRA0OZ2Txg48qc7NqAnVJqovkj-hHkIgKr6QZDT5A35J8kLDusyWKxP-XedPPJvVuXU0KHdA1-kUtDshV55U4hc0sWrSNn4R0qz301FYA9j2yJ2I_tMPxSMB-9pCSGWZFqPeT7vVUfJjgqoiJVvVUblg9YrHyezkdrxI")',
        }}
      >
        <div className="flex flex-col gap-4 text-center w-full max-w-3xl mx-auto">
          <h1 className="text-white font-heading text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Discover Your Next Great Read
          </h1>
          <h2 className="text-white/90 text-base font-normal leading-normal md:text-lg">
            Explore thousands of titles from beloved authors and new voices.
          </h2>
        </div>
        <button className="flex mx-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-primary-foreground text-base font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors">
          <span className="truncate">Shop All Books</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

