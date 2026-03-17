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
    // Add separate address component columns
    await connection.query(`
      ALTER TABLE user_addresses 
        ADD COLUMN city VARCHAR(255) NULL AFTER phone,
        ADD COLUMN ward VARCHAR(255) NULL AFTER city,
        ADD COLUMN specific_address TEXT NULL AFTER ward;
    `);
    console.log('Successfully added city, ward, specific_address columns!');
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
