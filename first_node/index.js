const express = require("express");
const userRouter = require("./routes/userRoute");
const { checkConnection } = require("./config/dbconnection");
const {createTable} = require("./utils/dbUtils")
const cookieParser = require("cookie-parser")
const app =express();
const PORT = 4000;

app.use(express.json())
app.use(cookieParser())

app.use("/",userRouter)
app.listen(PORT,async()=>{{
    console.log(`app is listing on the ${PORT}`)
    try {
        await checkConnection();
        await createTable()
    } catch (error) {
        console.log("Failed to initialize the database",error)
    }
}})