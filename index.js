const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const helmet = require("helmet")
const dotenv = require("dotenv")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
require("./prod")(app)

let mongoURL = "mongodb+srv://root:root@cluster0.fqw6n.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURL).then(()=>{
    console.log("mongoDB connected successfully")
})
.catch((err)=>{
    console.log("mongoDB not connected properly")
})

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.get("/",(req,res,next)=>{
    res.send("Welcome to Homepage")
})

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Server is running")
})