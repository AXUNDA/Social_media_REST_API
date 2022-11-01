const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const {MONGO_USER,MONGO_PASSWORD,MONGO_IP,MONGO_PORT} = require("./config.js")
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`



const app = express()
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan("common"))
const userRoute = require('./routes/users.js')
const authRoute = require('./routes/auth.js')
const postRoute = require('./routes/postRoute.js')


dotenv.config()
mongoose.connect(MONGO_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true,

}).then(()=> console.log("connected to the database"))

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.get("/api",(req,res)=>{
      res.send("hello world")
})




app.listen(process.env.PORT || 8800,()=> console.log("server is running"))