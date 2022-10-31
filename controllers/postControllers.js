const { response } = require("express")
const Post = require("../models/posts")
const User = require("../models/userDetails")

exports.createPost =  async (req,res)=>{
           


      try {
            const newPost = new Post(req.body)
           const data = await newPost.save()
           return res.status(201).json({
                  status:"created",
                  data
            })


            
      } catch (error) {
           return res.status(400).json({
                  status:"not created",
                  error
            })
            
            
      }
}

exports.deletePost = async (req,res)=>{

      try {
            const {id} = req.params
            const update = await Post.findById(id)
            if (update){
                  if(req.body.user == update.userId){
                         const deleted = await Post.findByIdAndDelete(id)
                         return res.status(202).json({
                              status:"removed",
                              deleted

                         })
                  }else{
                       return  res.status(404).json({
                              status:"error",
                              message:"you can not delete another users post"
                        })
                  }
            }else{
                 return res.json("no post found")
            }

      } catch (error) {
           return res.status(501).json({
                  status:"an error occurred",
                  error
            })
      }
}

exports.updatePost = async (req,res)=>{
              const {id} = req.params

      try {
            const update = await Post.findById(id)
            if(update){
                  if(req.body.userId == update.userId){
                        const updated = await Post.findByIdAndUpdate(id,{$set:req.body},{returnOriginal:false})
                       return res.status(201).json(updated)
                  }else{
                      return  res.status(501).json("you can only update your own post")
                  }
            }else{
                return  res.status(501).json("post  not found")


            }

            
      } catch (error) {
          return  res.status(501).json({
                  message:"an error occurred",
                  error
            })
            
      }
}
exports.likePost =async(req,res)=>{
           const {id} = req.params
      try {
           const update = await Post.findById(id)
           if(!update.likes.includes(req.body.userId)){
             const updated = await Post.findByIdAndUpdate(id,{$push:{likes:req.body.userId}},{returnOriginal:false})
            return res.status(201).json({
                  status:"liked",
                  updated
             })
           }else{
             const done = await Post.findByIdAndUpdate(id,{$pull:{likes:req.body.userId}},{returnOriginal:false})
           return res.status(201).json({
                  status: "like removed",
                  done
             })

           }
           
            
      } catch (error) {
           return res.status(500).json({
                  message:"something went wrong",
                  error
            })
            
      }

}
exports.getPost = async (req,res)=>{
              const {id} = req.params 
      try {
            const data = await Post.findById(id)
           return res.status(200).json(data)

            
      } catch (error) {
          return  res.status(501).json({
                  status:"error",
                  error
            })
            
      }
}

exports.getTimeline =  async (req,res) =>{
               const timeline = []
             
      try {

            const userPosts = await Post.find({userId:req.body.userId}) 
            timeline.push(userPosts)
            const currentUser = await User.findById(req.body.userId)
            currentUser.followers.map(async(user)=>{
                  try {
                       const data = await Post.find({userId:user})
                       timeline.push(data)

                        
                  } catch (error) {
                        console.log(error)
                        
                  }
            })
            currentUser.following.map(async(user)=>{
                  try {
                       const data = await Post.find({userId:user})
                       timeline.push(data)

                        
                  } catch (error) {
                        console.log(error)
                        
                  }
            })
          return res.status(200).json(timeline)

            
            
      } catch (error) {
          return  res.status(500).json({
                  status:"unable to find timeline",
                  error
            })
            
      }
}