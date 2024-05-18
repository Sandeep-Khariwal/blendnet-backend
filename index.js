import express from "express";
import cors from "cors"
import router from "./Route/Routes.js";
import stockRouter from "./Route/watchList.js"
import { Database } from "./Database/connection.js";
const app = express()
import * as dotenv from 'dotenv'
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(cors())

//databse
Database()

app.use("/auth",router)
app.use("/stock",stockRouter)

const PORT = process.env.SERVER_PORT || 8080 
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})
