// import cookieParser from "cookie-parser";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRouter from '../routes/user.js'
import movieRouter from '../routes/movies.js'
import connectDB from "../data/database.js";
//see
import dotenv from 'dotenv';
dotenv.config();

export const app = express();

connectDB();


app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173","https://movie-me-ter.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/users",userRouter);
app.use("/movies",movieRouter);


app.get('/', (req,res)=>{
  res.send("<h1>Nice Working</h1>")
});


export default app;
app.listen(4000, (req,res)=>{
  console.log("Server Running")
})
