const authController = require("../controllers/authController.js")

const router = require("express").Router()
const User = require("../models/userDetails")
const bcrypt = require("bcryptjs")
// const res = require("express/lib/response")


router.post("/register", authController.signup)

router.post('/login',authController.login)




module.exports = router