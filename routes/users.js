const { append } = require("express/lib/response")
const User = require("../models/userDetails")
const bcrypt = require("bcryptjs")

const router = require("express").Router()
router.put("/:id", function(req, res){
    console.log(req.body.email)
    if(req.params.id != req.body.email){
        res.status(403).json("you can not update another users account")
    }else {
        User.findOne({email:req.body.email},function(err, user){
            if(err){
                res.status(err).json("user not found")
            }else {
                const correct = bcrypt.compareSync(req.body.password,user.password)
                if(correct == true){
                    User.findOneAndUpdate({email:user.email},req.body,{returnOriginal:false},function(err){
                        if (err){
                            res.send(err);
                        }else{
                            res.send("updated")

                        }
                    })
                    
                    
                }else if(correct != true) {
                    res.status(404).json("wrong password")
                    
                }
            }
        })
    }
})





router.delete("/:id", function(req, res){
    console.log(req.body.email)
    if(req.params.id != req.body.email){
        res.status(403).json("you can only delete your own account")
    }else {
        User.findOne({email:req.body.email},function(err, user){
            if(err){
                res.status(err).json("user not found")
            }else {
                const correct = bcrypt.compareSync(req.body.password,user.password)
                if(correct == true){
                    User.remove({email:user.email},function(err){
                        if (err){
                            res.send(err);
                        }else{
                            res.send("deleted")

                        }
                    })
                    
                    
                }else if(correct != true) {
                    res.status(404).json("wrong password")
                    
                }
            }
        })
    }
})

router.get('/:id',function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            res.status(500).json(err)
        }else{
            var details = {
                name:user.username,
                email:user.email,
                followers:user.followers,
                following:user.following,
                coverPicture:user.coverPicture,
                profilePicture:user.profilePicture,
                id:user._id
            }
            res.send(details)
        }
    })
})
router.put('/:id/follow',function(req, res){
    if(req.params.id == req.body.userId){
        res.send("you can't follow yourself")
    }else{
        User.findById(req.params.id,function(err, user){
            if(!err){
                if(user.followers.includes(req.body.userId)){
                    res.send("you are already following this user")
                }else{
                    User.findOneAndUpdate({_id:req.params.id},{$push: {followers: req.body.userId}},function(err,){
                        if(err){
                            res.send(err);
                        }else{
                            User.findOneAndUpdate({_id:req.body.userId},{$push: {following: req.params.id}},function(err,){
                                if(err){
                                    res.send(err);
                                }else{
                                    res.send("you are now following this user")

                                }
                            })

                        }
                    })
                    // 
                    // 
                }
            }
        })
    }
})

router.put("/:id/unfollow",function(req,res) {
    if (req.params.id != req.body.userId) {
        User.findById(req.params.id,function(err, user){
            if(err){
                res.send(err)
                
            }else{ if(user.followers.includes(req.body.userId)){
                User.findOneAndUpdate({_id:req.params.id},{$pull:{followers:req.body.userId}},function(err,){
                    if(err){ 
                        res.send(err)
                    }else{
                        User.findOneAndUpdate({_id:req.body.userId},{$pull:{following:req.params.id}},function(err,){
                            if(err){
                                res.send(err)
                            }else{
                                res.send(" unfollowed")
                            }
                        })
                    }
                })
            }else{
                res.send("you are not following this user")
            }

            }
        })
    }else{
        res.send("you can not unfollow yourself")
    }
})



    




router.get("/", (req, res) => {res.send("hey its the user route ")})
module.exports = router