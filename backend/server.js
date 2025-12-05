import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/libs/db.js';
dotenv.config({path: './.env'});

const app = express();
const PORT = process.env.PORT || 8080;

// middleware 
app.use(express.json());
 
connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
