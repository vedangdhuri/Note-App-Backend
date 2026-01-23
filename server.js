import express from 'express';
import dotenv from 'dotenv/config';
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoute);

// http://localhost:8000/users/register

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})