import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";


const app = express();



app.use(express.json());
app.use(cors({
    origin : ["http://localhost:5173"] , methods: ["POST" , "GET"] , credentials: true
}));

app.use(cookieParser());

app.use("/api/auth", authRoute);



app.listen(3001, () => {
    console.log("Server Is Running");
});
