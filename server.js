import  express  from "express";
import colors from "colors" 
import dotenv from "dotenv"
import cors from "cors"
import authRouter from "./route/auth.js"
import {errorHandler} from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser";
import { mongoDbConnect } from "./config/db.js";



//initialization
const app = express();
dotenv.config()


//set midilware
app.use(express.json())
app.use(express.urlencoded({extends: false}))
app.use(cookieParser())
app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true,
    })
)



//set envirment vars
const PORT = process.env.PORT || 9090;

//static folder
app.use(express.static("public"))


// routing
app.use("/api/v1/auth", authRouter);

// use error handler
app.use(errorHandler);


//app lilsent
app.listen(PORT, () => {
    mongoDbConnect()
    console.log(`server is running on ${PORT}`.bgBlack.yellow)  
})


