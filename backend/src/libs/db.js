import mysql from "mysql2/promise";

let pool;

const createSchema = async () => {
  const connection = await pool.getConnection();

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        hashed_password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'USER',
        refresh_token TEXT NULL,
        email_verified_at TIMESTAMP NULL,
        email_verification_code VARCHAR(32) NULL,
        email_verification_expires_at TIMESTAMP NULL,
        password_reset_code VARCHAR(32) NULL,
        password_reset_expires_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        bio TEXT NULL,
        website VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL,
        isbn VARCHAR(50) NULL,
        publisher VARCHAR(255) NULL,
        publication_date DATE NULL,
        pages INT NULL,
        language VARCHAR(100) NULL,
        price DECIMAL(12,2) NOT NULL,
        rating DECIMAL(3,2) NOT NULL DEFAULT 0,
        stock INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_books_isbn (isbn),
        INDEX idx_books_title (title)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS book_authors (
        book_id INT NOT NULL,
        author_id INT NOT NULL,
        PRIMARY KEY (book_id, author_id),
        CONSTRAINT fk_book_authors_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
        CONSTRAINT fk_book_authors_author FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS book_categories (
        book_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY (book_id, category_id),
        CONSTRAINT fk_book_categories_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
        CONSTRAINT fk_book_categories_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS book_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        book_id INT NOT NULL,
        url TEXT NULL,
        alt_text VARCHAR(255) NULL,
        display_order INT DEFAULT 0,
        CONSTRAINT fk_book_images_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cart_id INT NOT NULL,
        book_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        UNIQUE KEY uq_cart_item (cart_id, book_id),
        CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        CONSTRAINT fk_cart_items_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_wishlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_user_wishlist_book (user_id, book_id),
        CONSTRAINT fk_user_wishlists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_user_wishlists_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
        payment_status VARCHAR(30) NOT NULL DEFAULT 'UNPAID',
        total_amount DECIMAL(12,2) NOT NULL,
        shipping_address TEXT NOT NULL,
        note TEXT NULL,
        buyer_name VARCHAR(255) NULL,
        buyer_email VARCHAR(255) NULL,
        buyer_phone VARCHAR(50) NULL,
        cancel_reason TEXT NULL,
        delivered_at TIMESTAMP NULL,
        paid_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        book_id INT NOT NULL,
        quantity INT NOT NULL,
        price_at_purchase DECIMAL(12,2) NOT NULL,
        CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        CONSTRAINT fk_order_items_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL UNIQUE,
        provider VARCHAR(50) NOT NULL,
        provider_id VARCHAR(255) NULL,
        amount DECIMAL(12,2) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'UNPAID',
        paid_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    const userColumnAdds = [
      "ADD COLUMN email_verified_at TIMESTAMP NULL",
      "ADD COLUMN email_verification_code VARCHAR(32) NULL",
      "ADD COLUMN email_verification_expires_at TIMESTAMP NULL",
      "ADD COLUMN password_reset_code VARCHAR(32) NULL",
      "ADD COLUMN password_reset_expires_at TIMESTAMP NULL",
    ];

    for (const alterClause of userColumnAdds) {
      try {
        await connection.query(`ALTER TABLE users ${alterClause}`);
      } catch (error) {
        if (!String(error?.message || "").toLowerCase().includes("duplicate column")) {
          throw error;
        }
      }
    }

    try {
      await connection.query("ALTER TABLE books ADD COLUMN rating DECIMAL(3,2) NOT NULL DEFAULT 0");
    } catch (error) {
      if (!String(error?.message || "").toLowerCase().includes("duplicate column")) {
        throw error;
      }
    }

    const seededRatings = [
      ["toi-thay-hoa-vang-tren-co-xanh", 4.7],
      ["mat-biec", 4.6],
      ["nha-gia-kim", 4.8],
      ["dac-nhan-tam", 4.5],
      ["sapiens-luoc-su-loai-nguoi", 4.7],
      ["homo-deus-luoc-su-tuong-lai", 4.4],
      ["de-men-phieu-luu-ky", 4.6],
      ["nghi-giau-lam-giau", 4.3],
      ["cho-toi-xin-mot-ve-di-tuoi-tho", 4.5],
      ["21-bai-hoc-cho-the-ky-21", 4.4],
      ["cay-cam-ngot-cua-toi", 4.9],
      ["tuoi-tre-dang-gia-bao-nhieu", 4.2],
      ["kheo-an-noi-se-co-duoc-thien-ha", 4.1],
      ["luoc-su-thoi-gian", 4.5],
      ["chuyen-con-meo-day-hai-au-bay", 4.7],
      ["song-mon", 4.0],
      ["bi-mat-tu-duy-trieu-phu", 4.3],
      ["nghe-thuat-tu-duy-ranh-mach", 4.2],
      ["di-tim-le-song", 4.4],
      ["tu-tot-den-vi-dai", 4.1],
    ];

    for (const [slug, rating] of seededRatings) {
      await connection.query("UPDATE books SET rating = ? WHERE slug = ?", [rating, slug]);
    }
  } finally {
    connection.release();
  }
};

export const connectDB = async () => {
  try {
    const host = process.env.MYSQL_HOST || "localhost";
    const port = Number(process.env.MYSQL_PORT || 3306);
    const user = process.env.MYSQL_USER || "root";
    const password = process.env.MYSQL_PASSWORD || "";
    const database = process.env.MYSQL_DATABASE || "bookhub";
    const connectionLimit = Number(process.env.MYSQL_CONNECTION_LIMIT || 10);

    const bootstrap = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    const safeDatabaseName = database.replace(/`/g, "");
    await bootstrap.query(`CREATE DATABASE IF NOT EXISTS \`${safeDatabaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await bootstrap.end();

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit,
      queueLimit: 0,
      decimalNumbers: true,
    });

    await pool.query("SELECT 1");
    await createSchema();

    console.log("MySQL connected successfully");
  } catch (error) {
    console.error("MySQL connection error:", error);
    process.exit(1);
  }
};

export const query = async (sql, params = []) => {
  if (!pool) {
    throw new Error("Database pool is not initialized. Call connectDB() first.");
  }

  const [rows] = await pool.query(sql, params);
  return rows;
};

export const withTransaction = async (callback) => {
  if (!pool) {
    throw new Error("Database pool is not initialized. Call connectDB() first.");
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
