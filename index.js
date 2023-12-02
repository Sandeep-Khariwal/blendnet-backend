import express from "express";
import cors from "cors"
import router from "./Route/Routes.js";
import { Database } from "./Database/connection.js";
const app = express()

app.use(express.json())
app.use(cors())

//databse
Database()

app.use("/auth",router)

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})
