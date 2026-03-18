import "dotenv/config";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "bookhub",
  waitForConnections: true,
});

const query = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const users = [
  {
    username: "admin",
    email: "admin@bookhub.com",
    password: "Admin@123",
    role: "ADMIN",
    email_verified_at: true,
  },
  {
    username: "nguyenvana",
    email: "nguyenvana@gmail.com",
    password: "User@123",
    role: "USER",
  },
  {
    username: "tranthib",
    email: "tranthib@gmail.com",
    password: "User@123",
    role: "USER",
  },
];

const authors = [
  {
    name: "Nguyễn Nhật Ánh",
    bio: "Nhà văn người Việt Nam nổi tiếng với các tác phẩm dành cho thiếu nhi và tuổi mới lớn.",
    website: "https://nguyennhatanh.com",
  },
  {
    name: "Paulo Coelho",
    bio: "Nhà văn người Brazil nổi tiếng thế giới, tác giả của 'Nhà Giả Kim'.",
    website: "https://paulocoelho.com",
  },
  {
    name: "Dale Carnegie",
    bio: "Nhà văn và diễn giả người Mỹ, chuyên về kỹ năng mềm và phát triển bản thân.",
    website: null,
  },
  {
    name: "Yuval Noah Harari",
    bio: "Nhà sử học và tác giả người Israel, nổi tiếng với bộ ba tác phẩm về lịch sử và tương lai nhân loại.",
    website: "https://www.ynharari.com",
  },
  {
    name: "Tô Hoài",
    bio: "Nhà văn Việt Nam, tác giả của 'Dế Mèn Phiêu Lưu Ký' và nhiều tác phẩm văn học thiếu nhi kinh điển.",
    website: null,
  },
  {
    name: "Nam Quốc Chánh",
    bio: "Tác giả các tác phẩm kinh doanh và self-help nổi tiếng tại Việt Nam.",
    website: null,
  },
];

const categories = [
  { name: "Văn học Việt Nam", slug: "van-hoc-viet-nam" },
  { name: "Văn học nước ngoài", slug: "van-hoc-nuoc-ngoai" },
  { name: "Kỹ năng sống", slug: "ky-nang-song" },
  { name: "Kinh tế - Kinh doanh", slug: "kinh-te-kinh-doanh" },
  { name: "Khoa học - Lịch sử", slug: "khoa-hoc-lich-su" },
  { name: "Thiếu nhi", slug: "thieu-nhi" },
  { name: "Tâm lý - Triết học", slug: "tam-ly-triet-hoc" },
];

const books = [
  {
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    slug: "toi-thay-hoa-vang-tren-co-xanh",
    description:
      "Câu chuyện về tuổi thơ đẹp đẽ và buồn bã của hai anh em Thiều và Tường ở một vùng quê Việt Nam. Tác phẩm là bức tranh sinh động về cuộc sống nông thôn với những tình cảm trong sáng, hồn nhiên.",
    isbn: "978-604-1-09876-1",
    publisher: "NXB Trẻ",
    publication_date: "2010-01-15",
    pages: 318,
    language: "Tiếng Việt",
    price: 89000,
    stock: 50,
    authors: ["Nguyễn Nhật Ánh"],
    categories: ["Văn học Việt Nam", "Thiếu nhi"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/5e/18/24/2a6154ba08df6ce6c6a7763a66a0d479.jpg",
    ],
  },
  {
    title: "Mắt Biếc",
    slug: "mat-biec",
    description:
      "Câu chuyện tình yêu trong sáng, da diết giữa Ngạn và Hà Lan từ thuở ấu thơ đến khi trưởng thành. Một trong những tác phẩm hay nhất của Nguyễn Nhật Ánh.",
    isbn: "978-604-1-08765-4",
    publisher: "NXB Trẻ",
    publication_date: "1990-06-01",
    pages: 264,
    language: "Tiếng Việt",
    price: 79000,
    stock: 35,
    authors: ["Nguyễn Nhật Ánh"],
    categories: ["Văn học Việt Nam"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/b1/6a0b28c38a9c00901d80d576f3b3be84.jpg",
    ],
  },
  {
    title: "Nhà Giả Kim",
    slug: "nha-gia-kim",
    description:
      "Câu chuyện về hành trình theo đuổi giấc mơ của Santiago, một chàng trai chăn cừu người Tây Ban Nha. Tác phẩm nổi tiếng nhất của Paulo Coelho, đã được dịch ra hơn 80 thứ tiếng.",
    isbn: "978-604-1-12345-6",
    publisher: "NXB Hội Nhà Văn",
    publication_date: "1988-01-01",
    pages: 228,
    language: "Tiếng Việt",
    price: 75000,
    stock: 60,
    authors: ["Paulo Coelho"],
    categories: ["Văn học nước ngoài", "Tâm lý - Triết học"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/45/37/sf/1b4c2b25a75c3c2be18539a7fb571c1c.png",
    ],
  },
  {
    title: "Đắc Nhân Tâm",
    slug: "dac-nhan-tam",
    description:
      "Cuốn sách nổi tiếng nhất về nghệ thuật giao tiếp và ứng xử, giúp bạn chinh phục mọi người và thành công trong cuộc sống. Đây là một trong những cuốn sách bán chạy nhất mọi thời đại.",
    isbn: "978-604-1-54321-9",
    publisher: "NXB Tổng hợp TP.HCM",
    publication_date: "1936-11-12",
    pages: 320,
    language: "Tiếng Việt",
    price: 86000,
    stock: 80,
    authors: ["Dale Carnegie"],
    categories: ["Kỹ năng sống", "Tâm lý - Triết học"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/df/26/85/0c4f855bd2f9a060fd0adb21664bc5ca.jpg",
    ],
  },
  {
    title: "Sapiens: Lược Sử Loài Người",
    slug: "sapiens-luoc-su-loai-nguoi",
    description:
      "Từ 70.000 năm trước đến ngày nay, loài người đã trở thành chủ nhân của hành tinh như thế nào? Yuval Noah Harari đưa ra cái nhìn toàn diện về lịch sử nhân loại.",
    isbn: "978-604-2-67890-3",
    publisher: "NXB Tri Thức",
    publication_date: "2011-01-01",
    pages: 572,
    language: "Tiếng Việt",
    price: 149000,
    stock: 40,
    authors: ["Yuval Noah Harari"],
    categories: ["Khoa học - Lịch sử", "Tâm lý - Triết học"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/51/83/3a/3e2777848dc8694d0c75c5f1aca03b35.jpg",
    ],
  },
  {
    title: "Homo Deus: Lược Sử Tương Lai",
    slug: "homo-deus-luoc-su-tuong-lai",
    description:
      "Harari khám phá tương lai của loài người khi công nghệ và trí tuệ nhân tạo đang thay đổi bộ mặt thế giới. Sự tiếp nối đáng chú ý của Sapiens.",
    isbn: "978-604-2-77890-5",
    publisher: "NXB Tri Thức",
    publication_date: "2015-01-01",
    pages: 464,
    language: "Tiếng Việt",
    price: 139000,
    stock: 30,
    authors: ["Yuval Noah Harari"],
    categories: ["Khoa học - Lịch sử"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/8a/ab/f7/6d6bb2aa1bd74fd20b3bcfe2a4b16879.jpg",
    ],
  },
  {
    title: "Dế Mèn Phiêu Lưu Ký",
    slug: "de-men-phieu-luu-ky",
    description:
      "Cuộc phiêu lưu kỳ thú của chú dế mèn qua những vùng đất khác nhau. Tác phẩm kinh điển của văn học thiếu nhi Việt Nam, gắn liền với tuổi thơ của nhiều thế hệ.",
    isbn: "978-604-1-11111-1",
    publisher: "NXB Kim Đồng",
    publication_date: "1941-01-01",
    pages: 208,
    language: "Tiếng Việt",
    price: 55000,
    stock: 70,
    authors: ["Tô Hoài"],
    categories: ["Văn học Việt Nam", "Thiếu nhi"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/1e/a5/e4/8bab2be1c3654ff8fef26b9fa9e50e4a.jpg",
    ],
  },
  {
    title: "Nghĩ Giàu Làm Giàu",
    slug: "nghi-giau-lam-giau",
    description:
      "Bộ triết lý thành công được đúc kết từ 500 người giàu có nhất nước Mỹ. Napoleon Hill chỉ ra 13 bước để đạt được sự giàu có và thành công trong cuộc sống.",
    isbn: "978-604-3-22222-8",
    publisher: "NXB Lao Động",
    publication_date: "1937-03-26",
    pages: 352,
    language: "Tiếng Việt",
    price: 98000,
    stock: 55,
    authors: ["Dale Carnegie"],
    categories: ["Kỹ năng sống", "Kinh tế - Kinh doanh"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/cb/b7/28/a1f9765512a6e99d96a33d9e3e1f4d7d.jpg",
    ],
  },
  {
    title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
    slug: "cho-toi-xin-mot-ve-di-tuoi-tho",
    description:
      "Hành trình ngược về tuổi thơ qua những ký ức trong sáng, hồn nhiên. Nguyễn Nhật Ánh kể câu chuyện về những đứa trẻ và thế giới quan phong phú của chúng.",
    isbn: "978-604-1-33333-2",
    publisher: "NXB Trẻ",
    publication_date: "2008-01-01",
    pages: 240,
    language: "Tiếng Việt",
    price: 72000,
    stock: 45,
    authors: ["Nguyễn Nhật Ánh"],
    categories: ["Văn học Việt Nam", "Thiếu nhi"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/57/d3/bb/7f29b4a79c63a9c2c26b7e8e3e1b6897.jpg",
    ],
  },
  {
    title: "21 Bài Học Cho Thế Kỷ 21",
    slug: "21-bai-hoc-cho-the-ky-21",
    description:
      "Harari bàn về những thách thức của thế giới hiện đại như AI, hậu sự thật, chủ nghĩa khủng bố và biến đổi khí hậu. Cẩm nang thiết yếu cho người sống trong thời đại hỗn loạn.",
    isbn: "978-604-2-44444-7",
    publisher: "NXB Tri Thức",
    publication_date: "2018-08-30",
    pages: 448,
    language: "Tiếng Việt",
    price: 135000,
    stock: 25,
    authors: ["Yuval Noah Harari"],
    categories: ["Khoa học - Lịch sử", "Kỹ năng sống"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/cc/72/60/3e85d32de7bb595c05dc3c73f0f3f793.jpg",
    ],
  },
  {
    title: "Cây Cam Ngọt Của Tôi",
    slug: "cay-cam-ngot-cua-toi",
    description:
      "Một câu chuyện cảm động về tuổi thơ và tình người, để lại dư âm sâu sắc cho người đọc.",
    isbn: "978-604-4-55555-1",
    publisher: "NXB Văn Học",
    publication_date: "1968-01-01",
    pages: 244,
    language: "Tiếng Việt",
    price: 99000,
    stock: 44,
    authors: ["Paulo Coelho"],
    categories: ["Văn học nước ngoài"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/c2/26/5c/da7b8d7ad5a20f4fa9f3bcb9ba8f89d4.jpg",
    ],
  },
  {
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    slug: "tuoi-tre-dang-gia-bao-nhieu",
    description:
      "Những chia sẻ truyền cảm hứng giúp người trẻ định hình mục tiêu và phát triển bản thân.",
    isbn: "978-604-4-55555-2",
    publisher: "NXB Hội Nhà Văn",
    publication_date: "2016-03-10",
    pages: 285,
    language: "Tiếng Việt",
    price: 88000,
    stock: 52,
    authors: ["Nam Quốc Chánh"],
    categories: ["Kỹ năng sống"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/0a/37/6c/91a3e8a49ddf95f2a4bb7d764de77f3c.jpg",
    ],
  },
  {
    title: "Khéo Ăn Nói Sẽ Có Được Thiên Hạ",
    slug: "kheo-an-noi-se-co-duoc-thien-ha",
    description:
      "Cuốn sách về nghệ thuật giao tiếp, thuyết phục và xây dựng quan hệ trong đời sống hiện đại.",
    isbn: "978-604-4-55555-3",
    publisher: "NXB Thế Giới",
    publication_date: "2014-09-21",
    pages: 406,
    language: "Tiếng Việt",
    price: 118000,
    stock: 37,
    authors: ["Dale Carnegie"],
    categories: ["Kỹ năng sống", "Tâm lý - Triết học"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/6f/6b/7f/45d301f97d65f34d16b0dd4f4ae79f40.jpg",
    ],
  },
  {
    title: "Lược Sử Thời Gian",
    slug: "luoc-su-thoi-gian",
    description:
      "Tác phẩm phổ biến khoa học giúp độc giả tiếp cận những câu hỏi lớn về vũ trụ và thời gian.",
    isbn: "978-604-4-55555-4",
    publisher: "NXB Trẻ",
    publication_date: "1988-04-01",
    pages: 312,
    language: "Tiếng Việt",
    price: 145000,
    stock: 29,
    authors: ["Yuval Noah Harari"],
    categories: ["Khoa học - Lịch sử"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/df/61/57/0a8ed3536c3a1e9bdfb1ef82fdf2f2d0.jpg",
    ],
  },
  {
    title: "Chuyện Con Mèo Dạy Hải Âu Bay",
    slug: "chuyen-con-meo-day-hai-au-bay",
    description:
      "Một ngụ ngôn hiện đại về lòng tử tế, trách nhiệm và tình bạn vượt qua khác biệt.",
    isbn: "978-604-4-55555-5",
    publisher: "NXB Văn Học",
    publication_date: "1996-01-01",
    pages: 160,
    language: "Tiếng Việt",
    price: 69000,
    stock: 61,
    authors: ["Paulo Coelho"],
    categories: ["Văn học nước ngoài", "Thiếu nhi"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/2b/62/0f/e87bfe19f68a5de1486f84b097dd6d8c.jpg",
    ],
  },
  {
    title: "Sống Mòn",
    slug: "song-mon",
    description:
      "Tiểu thuyết phản ánh đời sống trí thức nghèo với nhiều suy tư nhân văn sâu sắc.",
    isbn: "978-604-4-55555-6",
    publisher: "NXB Văn Học",
    publication_date: "1944-01-01",
    pages: 320,
    language: "Tiếng Việt",
    price: 84000,
    stock: 33,
    authors: ["Tô Hoài"],
    categories: ["Văn học Việt Nam"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/2a/e8/67/e3d36ab486215a252e83ff95a0f7bd5b.jpg",
    ],
  },
  {
    title: "Bí Mật Tư Duy Triệu Phú",
    slug: "bi-mat-tu-duy-trieu-phu",
    description:
      "Những nguyên tắc thay đổi tư duy tài chính và thói quen tiền bạc để đạt tự do tài chính.",
    isbn: "978-604-4-55555-7",
    publisher: "NXB Lao Động",
    publication_date: "2005-01-01",
    pages: 304,
    language: "Tiếng Việt",
    price: 102000,
    stock: 48,
    authors: ["Nam Quốc Chánh"],
    categories: ["Kinh tế - Kinh doanh", "Kỹ năng sống"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/9d/9c/3f/8786a2d9868335e44e7166b7e129703e.jpg",
    ],
  },
  {
    title: "Nghệ Thuật Tư Duy Rành Mạch",
    slug: "nghe-thuat-tu-duy-ranh-mach",
    description:
      "Tổng hợp các thiên kiến phổ biến trong tư duy, giúp ra quyết định logic và hiệu quả hơn.",
    isbn: "978-604-4-55555-8",
    publisher: "NXB Thế Giới",
    publication_date: "2011-01-01",
    pages: 336,
    language: "Tiếng Việt",
    price: 112000,
    stock: 41,
    authors: ["Dale Carnegie"],
    categories: ["Tâm lý - Triết học", "Kỹ năng sống"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/5f/91/11/20db698d3069a4124aa5d6cd999f4f13.jpg",
    ],
  },
  {
    title: "Đi Tìm Lẽ Sống",
    slug: "di-tim-le-song",
    description:
      "Tác phẩm kinh điển về ý nghĩa cuộc đời và sức mạnh tinh thần trong nghịch cảnh.",
    isbn: "978-604-4-55555-9",
    publisher: "NXB Tổng hợp TP.HCM",
    publication_date: "1946-01-01",
    pages: 228,
    language: "Tiếng Việt",
    price: 92000,
    stock: 58,
    authors: ["Paulo Coelho"],
    categories: ["Tâm lý - Triết học"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/c0/71/32/67f4cbf58e8ce5f89b0f6de2f7f8af3c.jpg",
    ],
  },
  {
    title: "Từ Tốt Đến Vĩ Đại",
    slug: "tu-tot-den-vi-dai",
    description:
      "Phân tích yếu tố giúp doanh nghiệp chuyển mình từ tốt lên xuất sắc trong dài hạn.",
    isbn: "978-604-4-55555-10",
    publisher: "NXB Công Thương",
    publication_date: "2001-10-16",
    pages: 416,
    language: "Tiếng Việt",
    price: 159000,
    stock: 36,
    authors: ["Nam Quốc Chánh"],
    categories: ["Kinh tế - Kinh doanh"],
    images: [
      "https://salt.tikicdn.com/cache/w1200/ts/product/71/84/5b/0d07aeb2b2b44f389b6876d8f996f8ff.jpg",
    ],
  },
];

// ─── SEED FUNCTIONS ───────────────────────────────────────────────────────────

const bookRatings = {
  "toi-thay-hoa-vang-tren-co-xanh": 4.7,
  "mat-biec": 4.6,
  "nha-gia-kim": 4.8,
  "dac-nhan-tam": 4.5,
  "sapiens-luoc-su-loai-nguoi": 4.7,
  "homo-deus-luoc-su-tuong-lai": 4.4,
  "de-men-phieu-luu-ky": 4.6,
  "nghi-giau-lam-giau": 4.3,
  "cho-toi-xin-mot-ve-di-tuoi-tho": 4.5,
  "21-bai-hoc-cho-the-ky-21": 4.4,
  "cay-cam-ngot-cua-toi": 4.9,
  "tuoi-tre-dang-gia-bao-nhieu": 4.2,
  "kheo-an-noi-se-co-duoc-thien-ha": 4.1,
  "luoc-su-thoi-gian": 4.5,
  "chuyen-con-meo-day-hai-au-bay": 4.7,
  "song-mon": 4.0,
  "bi-mat-tu-duy-trieu-phu": 4.3,
  "nghe-thuat-tu-duy-ranh-mach": 4.2,
  "di-tim-le-song": 4.4,
  "tu-tot-den-vi-dai": 4.1,
};

async function seedUsers() {
  console.log("Seeding users...");
  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    const verifiedAt = u.email_verified_at ? new Date() : null;
    await query(
      `INSERT IGNORE INTO users (username, email, hashed_password, role, email_verified_at) VALUES (?, ?, ?, ?, ?)`,
      [u.username, u.email, hashed, u.role, verifiedAt]
    );
  }
  console.log(`  ✓ ${users.length} users inserted`);
}

async function seedAuthors() {
  console.log("Seeding authors...");
  for (const a of authors) {
    await query(
      `INSERT IGNORE INTO authors (name, bio, website) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE bio=VALUES(bio), website=VALUES(website)`,
      [a.name, a.bio, a.website]
    );
  }
  console.log(`  ✓ ${authors.length} authors inserted`);
}

async function seedCategories() {
  console.log("Seeding categories...");
  for (const c of categories) {
    await query(
      `INSERT IGNORE INTO categories (name, slug) VALUES (?, ?)`,
      [c.name, c.slug]
    );
  }
  console.log(`  ✓ ${categories.length} categories inserted`);
}

async function seedBooks() {
  console.log("Seeding books...");

  // Build lookup maps
  const authorRows = await query(`SELECT id, name FROM authors`);
  const categoryRows = await query(`SELECT id, name FROM categories`);
  const authorMap = Object.fromEntries(authorRows.map((r) => [r.name, r.id]));
  const categoryMap = Object.fromEntries(categoryRows.map((r) => [r.name, r.id]));

  for (const b of books) {
    // Upsert book
    const [existing] = await query(`SELECT id FROM books WHERE slug = ?`, [b.slug]);
    let bookId;
    const rating = bookRatings[b.slug] ?? 0;

    if (existing) {
      bookId = existing.id;
      await query(
        `UPDATE books SET title=?, description=?, isbn=?, publisher=?, publication_date=?, pages=?, language=?, price=?, rating=?, stock=? WHERE id=?`,
        [b.title, b.description, b.isbn, b.publisher, b.publication_date, b.pages, b.language, b.price, rating, b.stock, bookId]
      );
    } else {
      const result = await query(
        `INSERT INTO books (title, slug, description, isbn, publisher, publication_date, pages, language, price, rating, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [b.title, b.slug, b.description, b.isbn, b.publisher, b.publication_date, b.pages, b.language, b.price, rating, b.stock]
      );
      bookId = result.insertId;
    }

    // Clear & re-insert relations
    await query(`DELETE FROM book_authors WHERE book_id = ?`, [bookId]);
    await query(`DELETE FROM book_categories WHERE book_id = ?`, [bookId]);
    await query(`DELETE FROM book_images WHERE book_id = ?`, [bookId]);

    for (const authorName of b.authors) {
      const authorId = authorMap[authorName];
      if (authorId) await query(`INSERT INTO book_authors (book_id, author_id) VALUES (?, ?)`, [bookId, authorId]);
    }

    for (const catName of b.categories) {
      const catId = categoryMap[catName];
      if (catId) await query(`INSERT INTO book_categories (book_id, category_id) VALUES (?, ?)`, [bookId, catId]);
    }

    for (let i = 0; i < b.images.length; i++) {
      await query(
        `INSERT INTO book_images (book_id, url, alt_text, display_order) VALUES (?, ?, ?, ?)`,
        [bookId, b.images[i], b.title, i]
      );
    }

    console.log(`  ✓ Book: ${b.title}`);
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  try {
    console.log("\n=== BookHub Seed Script ===\n");
    await seedUsers();
    await seedAuthors();
    await seedCategories();
    await seedBooks();
    console.log("\n✅ Seed completed successfully!");
  } catch (err) {
    console.error("\n❌ Seed failed:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
