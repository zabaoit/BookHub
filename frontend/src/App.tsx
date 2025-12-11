import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/booklist" element={<BooksPage />} />
          <Route path="/bookdetail/:id" element={<BookDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
