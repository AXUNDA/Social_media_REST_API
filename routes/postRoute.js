const router = require("express").Router()
const { append } = require("express/lib/response")
const Post = require("../models/posts.js")
const User = require("../models/userDetails.js")



router.post("/",async function(req, res){
    const newPost= new Post(req.body)
    try{
        newPost.save()
        res.status(200).json(newPost)

    }catch(err){
        res.status(500).json(err)
    }
    
})

router.put("/:id",async function(req, res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            res.status(500).json(err)
        }else{
            
            if(req.body.userId == post.userId){
                Post.findOneAndUpdate({_id: req.params.id},{$set:req.body},{returnOriginal:false},function(err,){
                    if(err){
                        res.status(500).json(err)
                    }else{
                        res.status(200).json("post updated")
                    }
                })
            }
        }
    })
})


router.delete("/:id",async function(req, res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            res.status(500).json(err)
        }else{
            if(req.body.userId == post.userId){
                Post.remove({_id: req.params.id},function(err,){
                    if(err){
                        res.status(500).json(err)
                    }else{
                        res.status(200).json("post deleted successfully")
                    }
                })
            }
        }
    })
})


router.put("/:id/like", function(req,res) {
    Post.findById(req.params.id, function(err,post) {
        if (err) {
            res.status(500).json(err)
        }else if(!post.likes.includes(req.body.userId)){
            
            Post.findOneAndUpdate({_id:req.params.id},{$push:{likes:req.body.userId}},function(err,){
                if(err){
                    res.send(err);
                }else{
                    res.send("liked")
                }
            })

        }else if(post.likes.includes(req.body.userId)){
            Post.findOneAndUpdate({_id:req.params.id},{$pull:{likes:req.body.userId}},function(err,){
                if(err){
                    res.send(err);
                }else{
                    res.send("unLiked")
                }
            })

        }
    })
})

router.get('/:id', function(req, res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            res.send(err);
        }else{
            res.status(200).json(post)
        }
    })
})

router.get("/timeline/all",function(req,res){
    const timeline=[]
    // followerTimeLine = []
    
            Post.find({userId:req.body.userId},function(err,post){
                if (err){
                    res.send(err);
                }else{
                    timeline.push(post)
                    User.findById(req.body.userId,function(err,user){
                        if (err){
                            console.log(err)
                        }else{
                            const all = user.followers.concat(user.following)
                            // console.log(all)
                            all.forEach(function(user){
                                Post.find({userId:user},function(err,post){
                                    if (err){
                                        res.send(err);
                                    }else{
                                        timeline.push(post);
                                        res.send(timeline)
                                    }
                                })
                
                                
                
                            })
                            // user.following.forEach(function(user){
                            //     Post.find({userId:user},function(err,post){
                            //         if (err){
                            //             res.send(err);
                            //         }else{
                            //             timeline.push(post)
                            //             // res.send(timeline)
                                        
                    
                            //         }
                            //     })
                
                                
                
                            // })
                            // console.log(timeline)

                        }
                    })
                    

                   
                   
                    
                    
                    

                }
            })
           
            // res.send(timeline)
            


        
        // res.send(timeline)
    
    // res.send(timeline)

})













router.get("/",function(req,res){
    res.send("this is the post route")
})




module.exports = router
