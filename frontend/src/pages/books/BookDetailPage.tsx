import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Header from "../../components/Header";
import { bookService } from "../../services/bookService";
import type { Book } from "../../types/book";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await bookService.fetchBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto flex-1 p-4 flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </main>
      </div>
    );
  }

  if (!book) {
    return (
      <div>
        <Header />
        <main className="container mx-auto flex-1 p-4 flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <Link to="/booklist" className="text-primary hover:underline">
            Back to Book List
          </Link>
        </main>
      </div>
    );
  }

  const imageUrl =
    book.imageUrl || (book.images && book.images[0]?.url) || "/placeholder.jpg";
    
  const authorName = Array.isArray(book.author)
    ? book.author
        .map((a: string | { _id: string; name: string }) =>
          typeof a === "string" ? a : a.name
        )
        .join(", ")
    : book.author || "Unknown Author";

  const discountPercent = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  return (
    <div>
      <Header />
      <main className="container mx-auto flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-8">
          {/* <!-- Breadcrumbs and Back Link --> */}
          <nav className="flex justify-between items-center">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Link className="hover:text-primary" to="/">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link className="hover:text-primary" to="/booklist">
                Books
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-text-light dark:text-text-dark">
                {book.title}
              </span>
            </div>
            <Link
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              to="/booklist"
            >
              <span className="material-symbols-outlined ">arrow_back</span>
              Back
            </Link>
          </nav>
          {/* <!-- Book Details Section --> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* <!-- Left Column: Image Gallery --> */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {/* Thumbnails placeholder */}
                <div
                  className="w-16 h-20 rounded-lg bg-center bg-no-repeat bg-cover cursor-pointer border-2 border-primary"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                ></div>
              </div>
              <div className="w-full flex-1 order-1 md:order-2">
                <div
                  className="w-full h-auto aspect-[280/400] max-w-[280px] md:max-w-none mx-auto rounded-xl bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                ></div>
              </div>
            </div>
            {/* <!-- Right Column: Book Info --> */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl lg:text-4xl font-black font-heading tracking-tight">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  by {authorName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: i < Math.floor(book.rating || 0) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <a
                  className="text-sm text-gray-500 hover:underline"
                  href="#reviews"
                >
                  ({book.reviewCount || 0} reviews)
                </a>
                <span className="w-px h-4 bg-border-light dark:bg-border-dark"></span>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${book.stock > 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                  <div className={`size-2 rounded-full ${book.stock > 0 ? 'bg-success' : 'bg-error'}`}></div>
                  {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Publisher:</strong> {book.publisher || "N/A"}
                </p>
                <p>
                  <strong>ISBN:</strong> {book.isbn || "N/A"}
                </p>
                <p>
                  <strong>Pages:</strong> {book.pages || "N/A"}
                </p>
                <p>
                  <strong>Language:</strong> {book.language || "N/A"}
                </p>
              </div>
              <div className="flex items-baseline gap-3 pt-4">
                <p className="text-4xl font-bold text-error">{book.price?.toLocaleString("vi-VN")}đ</p>
                {book.originalPrice && book.originalPrice > book.price && (
                  <p className="text-xl text-gray-500 line-through">{book.originalPrice.toLocaleString("vi-VN")}đ</p>
                )}
                {discountPercent > 0 && (
                  <div className="rounded bg-accent/50 px-2 py-0.5 text-sm font-bold text-primary">
                    -{discountPercent}%
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center border border-border-light dark:border-border-dark rounded-lg">
                  <button 
                    className="p-2 h-12 w-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <input
                    className="w-12 h-12 text-center border-y-0 border-x border-border-light dark:border-border-dark bg-transparent focus:ring-0"
                    type="text"
                    value={quantity}
                    readOnly
                  />
                  <button 
                    className="p-2 h-12 w-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg"
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <button 
                  className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 rounded-lg bg-primary h-12 px-6 text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={book.stock <= 0}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (book._id) {
                      const { useCartStore } = await import("../../store/useCartStore");
                      await useCartStore.getState().addToCart(book._id, quantity);
                    }
                  }}
                >
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                  Add to Cart
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border-2 border-primary h-12 px-6 text-primary font-bold hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Tabs for Description, Preview, Reviews --> */}
          <div className="border-t border-border-light dark:border-border-dark pt-8">
            <div className="border-b border-border-light dark:border-border-dark">
              <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                <a
                  className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  href="#"
                >
                  Description
                </a>
              </nav>
            </div>
            <div className="py-6">
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>{book.description || "No description available."}</p>
              </div>
            </div>
          </div>
          {/* <!-- Reviews Section --> */}
          <div
            className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col gap-6"
            id="reviews"
          >
            <h2 className="text-2xl font-bold font-heading">
              Reviews &amp; Ratings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3 items-center justify-center bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-border-light dark:border-border-dark">
                <p className="text-5xl font-bold">4.5</p>
                <div className="flex items-center text-amber-500">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined">star_half</span>
                </div>
                <p className="text-sm text-gray-500">Based on 1,283 reviews</p>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-10">5 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">962</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">4 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">192</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">3 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "5%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">64</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">2 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "3%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">38</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10">1 star</span>{" "}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: "2%" }}
                    ></div>
                  </div>{" "}
                  <span className="w-12 text-right">27</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold">Showing 3 of 1,283 reviews</p>
              <select className="form-select rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary">
                <option>Most recent</option>
                <option>Highest rating</option>
                <option>Lowest rating</option>
              </select>
            </div>
            <div className="space-y-6">
              {/* <!-- Review Item --> */}
              <div className="flex flex-col gap-3 border-b border-border-light dark:border-border-dark pb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAls6kj6E2oVzORoHfzoN813KHgju12YPcGfbGrL5iG8NMA9ta_Qxtq9tHaWTn0yUQ91hhDov5WbK1gqoEXxhm9w-t-_9pEKY9GGf6lGmP8Q7-mth5k6-UqR71xWqvCfYzz8JWs09xX_jP4eg96z__MhTH3v3z5Aiwy_7F5BXVSpXFRVA3o1m7A2X2SPvNFay9MLDkk01x0ZKJZu2Ja1xDOOHM3Q3XZDni0AAuWN96ujdHfObikhqvJwjQiYVNO61qh6uvusydtadw")',
                    }}
                  ></div>
                  <div>
                    <p className="font-bold">Jane S.</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-500">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  An absolutely stunning and thought-provoking novel. I couldn't
                  put it down. The concept is brilliant and the execution is
                  flawless. A must-read for anyone who's ever wondered 'what
                  if?'.
                </p>
              </div>
              {/* <!-- Review Item --> */}
              <div className="flex flex-col gap-3 border-b border-border-light dark:border-border-dark pb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAls6kj6E2oVzORoHfzoN813KHgju12YPcGfbGrL5iG8NMA9ta_Qxtq9tHaWTn0yUQ91hhDov5WbK1gqoEXxhm9w-t-_9pEKY9GGf6lGmP8Q7-mth5k6-UqR71xWqvCfYzz8JWs09xX_jP4eg96z__MhTH3v3z5Aiwy_7F5BXVSpXFRVA3o1m7A2X2SPvNFay9MLDkk01x0ZKJZu2Ja1xDOOHM3Q3XZDni0AAuWN96ujdHfObikhqvJwjQiYVNO61qh6uvusydtadw")',
                    }}
                  ></div>
                  <div>
                    <p className="font-bold">Mark B.</p>
                    <p className="text-xs text-gray-500">1 month ago</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-500">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined text-base">
                    star
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Enjoyed it, but felt the ending was a bit predictable. Still,
                  a very creative and engaging story that makes you reflect on
                  your own life choices.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Related Books Section --> */}
          <div className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold font-heading">Related Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for The Humans"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy0YW_uziHJUiEbsRDeZ4JWydPvF2gcNCdbSF_n5VJ5PsXUszaZybBP9SGzn25jM7NQofx_YoL7dSj3_p_DuFmfWsaj78cwusKMFwIuIquSzDnPgSCjSfstIJWriN96gmShUavNPElVWyixu8Ew0BlWm-sFG0itMoFW3mm0JkBY4HXX78fZFIYKot-RhW5nYy8TWm0YTYzWDUc6ApZPNmsrA7AwtNm8NFTszvJ6odpfNJO3j5j2jTgfBaWTYrowp9B8WSmCvC4HFk"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    The Humans
                  </h3>
                  <p className="text-xs text-gray-500">Matt Haig</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for How to Stop Time"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgsteoWPW4dA4aeNYL2ITMTH4XVeeDTcUa3nHFe6hKhOlMGpnXIkL25N_Ggoh4qimXBSGeRNEsn0xuSHTXc-fHNaw_zRJx-LOFl5ZGuRk8qZNMhIwm6FmDyM7kPMT8_sYdwuLxphtvkGWbX6KmYievHl64751-ydDpN8WsbEH-neXO8pBIQKCdlSO6Lgl2jikwSWxxs9J4LNE6ihbGH5CFYxranBBb6mtDHPGq5s6jCjJdIVl2pMYhoMjJdVNuf7VSg74AKa5WFwg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    How to Stop Time
                  </h3>
                  <p className="text-xs text-gray-500">Matt Haig</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for The Invisible Life of Addie LaRue"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGhSOkSc90TI3qci5yFasa3IixYOfz9O7IH1lGMpKmNjF_2sPCGURwTbEKzblcLsPWAWgBzC3DHNCIczDlBw-53GZrVYmT7Q5S53x-sg2efBilS6QPn1aN--ly1oCN3LBEyyQShm_AbY-VyEo8oNJx0Z85uu-4BPh3rUL2IL16IhtXR7P5S2Mlq8-oC-OsE9J0EXbhZY6coI7qX9x3HMD5j3NS6rJogU6myaeFEfmEKCLf1WEu2vCV7FI3_fKtLltfRmqAOvuyfAI"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    The Invisible Life of Addie LaRue
                  </h3>
                  <p className="text-xs text-gray-500">V.E. Schwab</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for Project Hail Mary"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEdzfqauzlHyFk-TBBxIzIrcR7lQfhvRgKdu7zTD_TncIlOhkgSw8gpF_LawKbdSSVTeVdZqNsKZcTACRljSN2aETDe1Cm_JfkgA8oZtOhRT7irrJGJLiE5NNW_ZhmxHwH-CuD2l-tfZgN6XZvYSo69lN_cJklIuufqVeklPEjUVuac5qD9qw-DTSAQ4tlpejwFDDgkP8ls1jwqrXaD_cCpNJyFR4_ZG1m3WkD0trjDwGkgfwA-kIoQFn-Go_tnxzNZLHwvh1cxSM"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    Project Hail Mary
                  </h3>
                  <p className="text-xs text-gray-500">Andy Weir</p>
                </div>
              </div>
              {/* <!-- Related Book Card --> */}
              <div className="flex flex-col gap-2 group">
                <div className="aspect-[2/3] w-full bg-cover bg-center rounded-lg overflow-hidden transform group-hover:-translate-y-1 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Book cover for Circe"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt97eDghVBEe-4wz1PBfwuoCFt4pu0dLdfE2qqojSR2DIRCpX4NqCgEtb2cyNfeE1-Yj75KqG4r4kDmvoIHiItNA5vOeqPznhypm3uOabYg48QJlk_Jmt79HVZm4MvMFkExrRKK3FCKYENtJpgFXFRnPfJjI2xW8L6jB58jByoI3-VwQmG3Ph7CR8gHQ3W8g0qaj-eUnMv3WxclhPhIeiHPHDtdcKT3VBZSh9GgEsKRObLBJKdhfbLDfM9SeIYsFQg6oxWzC_eT08"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate group-hover:text-primary">
                    Circe
                  </h3>
                  <p className="text-xs text-gray-500">Madeline Miller</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailPage;

