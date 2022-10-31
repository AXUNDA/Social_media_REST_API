
const User = require("../models/userDetails")
const bcrypt = require("bcryptjs")
const userController = require("../controllers/userControllers.js")

const router = require("express").Router()
router.put("/:id/:auth",userController.editUser)





router.delete("/:id",userController.deleteUser)

router.get('/:id',userController.getUser)


router.patch('/follow/:id',userController.followUser)


    




router.get("/", (req, res) => {res.send("hey its the user route ")})
module.exports = router