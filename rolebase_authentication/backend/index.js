const express = require("express");
const app  = express();
const dotenv  =require("dotenv");
dotenv.config();
const bodyParsesr = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./src/routes/userRoute");
const { checkConnection } = require("./src/config/dbconnection");
const { taskTable, createUserTable } = require("./src/model/userSchema");
const PORT = process.env.PORT || 5000 ;
app.use(cors({
    origin:"*"
}))
app.use(bodyParsesr.json());
app.use(bodyParsesr.urlencoded({extended:true}));
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Hello world in an alive")
})


app.use("/api/v1",userRoute)

//comsm

app.listen(PORT,async()=>{
    console.log(`server is running on the port ${PORT}`)
    try {
        await checkConnection()
        await createUserTable();
        await taskTable();
    } catch (error) {
        console.log("error in backend index.js ")
        process.exit(1)

    }
})