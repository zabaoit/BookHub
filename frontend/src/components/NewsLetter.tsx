const NewsLetter = () => {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="font-heading text-secondary-foreground text-3xl font-bold leading-tight tracking-tight mb-2">
          Join Our Newsletter
        </h2>
        <p className="text-secondary-foreground/80 mb-6">
          Get exclusive offers and book recommendations delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <input
            className="form-input flex-grow w-full rounded-lg h-12 px-4 bg-input border border-border focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter your email"
            type="email"
          />
          <button
            className="flex-shrink-0 flex items-center justify-center h-12 px-6 bg-primary text-primary-foreground text-base font-bold rounded-lg hover:bg-primary/90 transition-colors"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;

