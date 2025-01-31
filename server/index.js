import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/dbConnect.js';
import userRoute from './routes/user.routes.js'

const app=express();
dotenv.config({});

//db connection
connectDb();

const PORT=process.env.PORT || 3000;

//apis

app.use("/api/v1/user",userRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})