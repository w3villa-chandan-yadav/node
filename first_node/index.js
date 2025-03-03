const express = require("express");
const userRouter = require("./routes/userRoute");
const app =express();
const PORT = 4000;



app.use("/",userRouter)






app.listen(PORT,()=>{{
    console.log(`app is listing on the ${PORT}`)
}})