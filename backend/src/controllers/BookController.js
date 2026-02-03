import Book from "../models/BookModel.js";

const postBook = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      isbn,
      publisher,
      publicationDate,
      pages,
      language,
      price,
      stock,
      author,
      images,
      categories,
    } = req.body;

    if (!title || !slug || !price) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
    }

    const existingBook = await Book.findOne({ slug });
    if (existingBook) {
      return res.status(400).json({
        message: "Đường dẫn URL đã tồn tại, vui lòng chọn đường dẫn khác",
      });
    }
    const newBook = await Book.create({
      title,
      slug,
      description,
      isbn,
      publisher,
      publicationDate,
      pages,
      language,
      price,
      stock: stock || 0,
      author,
      images,
      categories,
    });

    return res
      .status(201)
      .json({ message: "Thêm sách thành công!", data: newBook });
  } catch (error) {
    return res.status(500).json({ message: `Loi server: ${error.message}` });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      author,
      sortBy,
    } = req.query;

    const queryObject = {};
    if (search) {
      queryObject.title = { $regex: search, $options: "i" };
    }
    if (category) {
      queryObject.categories = category;
    }
    if (author) {
      queryObject.author = author;
    }

    let sortOptions = { createdAt: -1 };
    if (sortBy === "oldest") {
      sortOptions = { createdAt: 1 };
    } else if (sortBy === "price-low") {
      sortOptions = { price: 1 };
    } else if (sortBy === "price-high") {
      sortOptions = { price: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const totalBooks = await Book.countDocuments(queryObject);
    const books = await Book.find(queryObject)
      .populate("author", "name")
      .populate("categories", "name")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      message: "Lấy danh sách sách thành công!",
      data: books,
      total: totalBooks,
      page: parseInt(page),
      totalPages: Math.ceil(totalBooks / limitNum),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get all books error: ${error.message}` });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findById(id)
      .populate("author", "name")
      .populate("categories", "name");
    if (!books) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }
    return res
      .status(200)
      .json({ message: "Lấy thông tin sách thành công!", data: books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get book by id error: ${error.message}` });
  }
};

const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      isbn,
      publisher,
      publicationDate,
      pages,
      language,
      price,
      stock,
      author,
      images,
      categories,
    } = req.body;

    const books = await Book.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        description,
        isbn,
        publisher,
        publicationDate,
        pages,
        language,
        price,
        stock: stock || 0,
        author,
        images,
        categories,
      },
      { new: true, runValidators: true }
    );

    if (!books) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    return res
      .status(200)
      .json({ message: "Cập nhật sách thành công!", data: books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Update book by id error: ${error.message}` });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findByIdAndDelete(id);
    if (!books) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }
    return res.status(200).json({ message: "Xóa sách thành công!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Delete book by id error: ${error.message}` });
  }
};

export { postBook, getAllBooks, getBookById, updateBookById, deleteBookById };
