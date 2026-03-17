import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'bookhub'
  });
  
  try {
    await connection.query(`ALTER TABLE users 
      ADD COLUMN phone VARCHAR(50) NULL,
      ADD COLUMN birthday DATE NULL,
      ADD COLUMN gender VARCHAR(20) NULL;`);
    console.log('Successfully altered users table!');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist.');
    } else {
      console.error(err);
    }
  } finally {
    await connection.end();
  }
}

run();
