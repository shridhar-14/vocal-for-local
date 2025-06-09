const path = require('path')
const express = require('express')
const connectDB = require('./utils/db.js')
const userRouter = require('./routers/user.router.js')
const storeRouter = require('./routers/store.router.js')
const logger = require('./middlewares/logger.middlewares.js')
const upload = require('./middlewares/fileupload.middlewares.js')
const reviewRouter = require('./routers/review.router.js')
const PORT = 5000;
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/",(req, res)=>{
   res.send("WELCOME TO VOCAL FOR LOCAL")
})

app.use("/users/",userRouter)
app.use("/store/",storeRouter)
app.use("/review",reviewRouter)

app.listen(PORT, function(){
    console.log(`Server started at port ${PORT}`)
    //add this
    connectDB();
})