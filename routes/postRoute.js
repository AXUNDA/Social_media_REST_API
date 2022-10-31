const router = require("express").Router()

const Post = require("../models/posts.js")
const User = require("../models/userDetails.js")
const postControllers = require("../controllers/postControllers")



router.post("/",postControllers.createPost)

router.delete("/:id",postControllers.deletePost)


router.put("/:id",postControllers.updatePost)


router.put("/:id/like",postControllers.likePost)

router.get('/:id', postControllers.getPost)

router.get("/timeline/all",postControllers.getTimeline)













router.get("/",function(req,res){
    res.send("this is the post route")
})




module.exports = router
