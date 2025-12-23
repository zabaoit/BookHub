import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useBookStore from "../../store/useBookStore";

const BooksPage = () => {
  const {
    books,
    loading,
    currentPage,
    totalPages,
    total,
    filters,
    fetchBooks,
    setFilters,
    setPage,
    clearFilters,
  } = useBookStore();

  useEffect(() => {
    fetchBooks(); // Load books when component mounts
  }, [fetchBooks]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* <!-- Sticky Filter Sidebar --> */}
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <div className="sticky top-24">
              <div className="flex h-full min-h-[700px] flex-col justify-between bg-card p-4 rounded-xl shadow-sm border border-border">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col border-b border-border pb-4">
                    <h1 className="text-foreground text-lg font-bold font-heading">
                      Filters
                    </h1>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      Refine your search
                    </p>
                  </div>
                  {/* <!-- Price Range Slider --> */}
                  <div className="border-b border-border py-4">
                    <p className="text-foreground text-base font-medium leading-normal w-full mb-3">
                      Price Range
                    </p>
                    <div className="flex h-[38px] w-full pt-1.5">
                      <div className="flex h-1.5 w-full rounded-full bg-primary/20">
                        <div className="relative w-[20%]">
                          <div className="absolute -left-2 -top-2 flex flex-col items-center gap-1">
                            <div className="size-5 rounded-full bg-primary border-2 border-card shadow"></div>
                            <p className="text-foreground text-xs font-normal leading-normal">
                              $10
                            </p>
                          </div>
                        </div>
                        <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                        <div className="relative w-[25%]">
                          <div className="absolute -right-2 -top-2 flex flex-col items-center gap-1">
                            <div className="size-5 rounded-full bg-primary border-2 border-card shadow"></div>
                            <p className="text-foreground text-xs font-normal leading-normal">
                              $75
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Author Search --> */}
                  <div className="border-b border-border pb-4">
                    <p className="text-foreground text-base font-medium leading-normal w-full mb-2">
                      Author
                    </p>
                    <label className="flex flex-col min-w-40 h-11 w-full">
                      <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                        <div className="text-muted-foreground flex border border-r-0 border-border bg-secondary items-center justify-center pl-3 rounded-l-lg">
                          <span className="material-symbols-outlined text-xl">
                            search
                          </span>
                        </div>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-1 focus:ring-primary border-border bg-secondary focus:border-primary h-full placeholder:text-muted-foreground px-3 rounded-l-none border-l-0 text-sm font-normal leading-normal"
                          placeholder="Search by author..."
                          defaultValue=""
                          onChange={(e) =>
                            handleFilterChange({ author: e.target.value })
                          }
                        />
                      </div>
                    </label>
                  </div>
                  {/* <!-- Categories Accordion --> */}
                  <div className="flex flex-col border-b border-border pb-2">
                    <details
                      className="flex flex-col group"
                      // open=""
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                        <p className="text-foreground text-base font-medium leading-normal">
                          Categories
                        </p>
                        <span className="material-symbols-outlined text-foreground group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="flex flex-col gap-2 pt-2 pb-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            // checked=""
                            className="form-checkbox rounded-sm bg-secondary border-border text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Fiction
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            className="form-checkbox rounded-sm bg-secondary border-border text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Non-Fiction
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            // checked=""
                            className="form-checkbox rounded-sm bg-secondary border-border text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Science Fiction
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            className="form-checkbox rounded-sm bg-secondary border-border text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Fantasy
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            className="form-checkbox rounded-sm bg-secondary border-border text-primary focus:ring-primary/50"
                            type="checkbox"
                          />{" "}
                          Mystery
                        </label>
                      </div>
                    </details>
                  </div>
                  {/* <!-- Rating Filter --> */}
                  <div className="pt-2 pb-4">
                    <p className="text-foreground text-base font-medium leading-normal w-full mb-2">
                      Rating
                    </p>
                    <div className="flex items-center gap-1 text-accent cursor-pointer">
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined !text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="material-symbols-outlined !text-2xl">
                        star
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">
                        &amp; up
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30">
                  <span className="truncate">Reset All Filters</span>
                </button>
              </div>
            </div>
          </aside>
          {/* <!-- Books Grid and Sorting --> */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-heading mb-2">
                  Browse Books
                </h1>
                {total > 0 && (
                  <p className="text-muted-foreground text-sm">
                    Showing {(currentPage - 1) * 12 + 1}-
                    {Math.min(currentPage * 12, total)} of {total} books
                    {filters.search && <span> for "{filters.search}"</span>}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm mt-4 sm:mt-0">
                <span className="text-muted-foreground">Sort by:</span>
                <select
                  value={filters.sortBy || "newest"}
                  onChange={(e) =>
                    handleFilterChange({
                      sortBy: e.target.value as
                        | "newest"
                        | "oldest"
                        | "price-low"
                        | "price-high"
                        | "rating"
                        | "popular",
                    })
                  }
                  className="px-3 py-2 border border-border rounded-lg bg-card text-foreground text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
            {/* <!-- Book Grid --> */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : books && books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="flex flex-col bg-card rounded-xl shadow-sm border border-border overflow-hidden group"
                  >
                    <div className="relative">
                      <div
                        className="bg-center bg-no-repeat aspect-[3/4] bg-cover"
                        data-alt={`Book cover for '${book.title}'`}
                        style={{
                          backgroundImage: `url('${
                            book.images?.[0]?.url ||
                            book.imageUrl ||
                            "https://via.placeholder.com/300x400?text=No+Image"
                          }')`,
                        }}
                      ></div>
                      <button className="absolute top-2 right-2 flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 bg-card/80 backdrop-blur-sm text-foreground/80 gap-2 min-w-0 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-heading font-bold text-lg leading-tight text-foreground">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {Array.isArray(book.author)
                          ? book.author
                              .map((a) => (typeof a === "string" ? a : a.name))
                              .join(", ")
                          : book.author}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-accent">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined !text-base"
                            style={{
                              fontVariationSettings:
                                i < Math.floor(book.rating || 0)
                                  ? "'FILL' 1"
                                  : "'FILL' 0",
                            }}
                          >
                            star
                          </span>
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({book.reviewCount || 0})
                        </span>
                      </div>
                      <div className="mt-3">
                        {book.originalPrice &&
                        book.originalPrice > book.price ? (
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-bold text-primary">
                              ${book.price}
                            </p>
                            <p className="text-sm text-muted-foreground line-through">
                              ${book.originalPrice}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xl font-bold text-primary">
                            ${book.price}
                          </p>
                        )}
                      </div>
                      <button className="mt-4 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                        <span className="truncate">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl text-muted-foreground/20 mb-4">📚</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No books found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Clear Filters
                </button>
              </div>
            )}
            {/* <!-- Pagination Control --> */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12">
                <nav
                  aria-label="Pagination"
                  className="flex items-center gap-2"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center size-9 rounded-lg border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined !text-xl">
                      chevron_left
                    </span>
                  </button>

                  {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === currentPage;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`flex items-center justify-center size-9 rounded-lg font-medium ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-card hover:bg-primary/10 text-muted-foreground"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="flex items-center justify-center size-9 text-muted-foreground">
                        ...
                      </span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="flex items-center justify-center size-9 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground font-medium"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center size-9 rounded-lg border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined !text-xl">
                      chevron_right
                    </span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BooksPage;
