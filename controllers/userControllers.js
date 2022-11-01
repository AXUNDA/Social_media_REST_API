const User = require("../models/userDetails")
const bcrypt = require("bcryptjs")


exports.editUser = async (req,res)=>{
      try {
            const {id,auth} = req.params
            if(id != req.body.userId){
                 return res.status(501).json({
                        status:"no authorization",
                        error:"you can not edit this user account"
                  })
            }else{
                  currentUser = await User.findById(id)
                  const status = bcrypt.compareSync(auth, currentUser.password)
                  if(status){
                       const updated = await User.findByIdAndUpdate(id,{$set:req.body},{returnOriginal:false})
                      return res.status(201).json({
                             status:"updated",
                             data: updated
                             

                       })
                  }else{
                       return res.status(504).json({
                              status:"error",
                              message:"incorrect credentials"
                        })
                  }
            }  
      } catch (error) {
           return res.status(501).json({
                  status:"internal server error",
                  error 
            }) 
      }
}
exports.deleteUser = async (req,res)=>{


      try{
            if(req.params.id != req.body.userId){

                 return res.status(504).json({
                        status:"no auth",
                        error:"you can not delete another user's account"
                  })
            }else{
                  currentUser = await User.findById(req.params.id)
                  const correct = bcrypt.compareSync(req.body.password,currentUser.password)
                  if(correct){
                       const deleted = await User.findByIdAndDelete(req.params.id)
                       return res.status(201).json({
                              status:"removed",
                              deleted
                              
                        })

                  }else{
                       return res.status(504).json({
                              status:"no auth",
                              error:" incorrect credentials"
                        })
                  }

            }

      }catch(err){
          return  res.status(500).json({
                  status:"an error occurred",
                  err
            })

      }
}
exports.getUser = async (req,res)=>{
      try {
            const fetchedUser = await User.findById(req.params.id)
           return res.status(200).json({
                  status:" found",
                  data:{
                        name:fetchedUser.username,
                        email:fetchedUser.email
                  }
            })
            
      } catch (error) {
           return res.status(501).json({
                  status:"an error occurred",
                  error
            })
            
      }
}

exports.followUser = async(req, res)=>{
      const {id} = req.params

      try {
            if(id == req.body.userId){
                return  res.status(400).json({
                        status:"invalid",
                        error:"you can not follow yourself"
                  })
            }else{
                  const toFollow = await User.findById(id)
                  if(toFollow.followers.includes(req.body.userId)){
                       await  User.findByIdAndUpdate(id,{$pull:{followers:req.body.userId}})
                       await  User.findByIdAndUpdate(req.body.userId,{$pull:{following:id}})
                       return res.status(200).json({
                            status:"done",
                            message:"you are no longer following this user"
                       })

                  }else{
                       await  User.findByIdAndUpdate(id,{$push:{followers:req.body.userId}})
                       await  User.findByIdAndUpdate(req.body.userId,{$push:{following:id}})
                       return res.status(200).json({
                          status:"done",
                          status:"you are now following this user"
                       })



                  }
            }

            
      } catch (error) {
            return res.status(500).json({
                  status:"an error occurred",
                  error
            })
            
      }
}