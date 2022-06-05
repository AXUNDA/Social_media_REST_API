const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

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
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("connected to the database"))

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
// app.post("/",function(req,res){
//     console.log(req.body)
// })



app.listen(8800,()=> console.log("server is running"))