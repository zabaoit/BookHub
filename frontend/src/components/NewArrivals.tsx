import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useBookStore from "../store/useBookStore";
import BookCard from "./BookCard";

const NewArrivals = () => {
  const { newReleases, loading, fetchNewReleases } = useBookStore();

  useEffect(() => {
    fetchNewReleases();
  }, [fetchNewReleases]);

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Sách mới
            </h2>
            <p className="text-muted-foreground">Vừa cập nhật</p>
          </div>
          <Link to="/booklist">
            <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card text-foreground font-medium rounded-lg hover:bg-secondary transition-colors">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {newReleases.slice(0, 5).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
