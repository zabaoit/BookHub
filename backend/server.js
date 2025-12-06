import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/libs/db.js';
import authRoute from './src/routes/AuthRoute.js'
import { protectedRoute } from './src/middlewares/AuthMiddleWare.js';
dotenv.config({path: './.env'});

const app = express();
const PORT = process.env.PORT || 8080;

// middleware 
app.use(express.json());
app.use(cookieParser());

connectDB();

// public routes
app.use('/api/auth', authRoute);

// private routes
app.use(protectedRoute);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
