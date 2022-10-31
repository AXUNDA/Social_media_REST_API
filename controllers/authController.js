const bcrypt = require("bcryptjs")
const User = require("../models/userDetails")


exports.signup= async (req,res)=>{
      try {
            const salt = bcrypt.genSaltSync(10);
    
          const newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password, salt),
    })
         await newUser.save()
       return res.status(201).json({
            status:"created",
            data:{
                  username:newUser.username,
                  email:newUser.email
            }
        })

            
      } catch (error) {
          return  res.status(500).json({
                  status:"there was an error",
                  error
            })
            
      }

}

exports.login = async(req,res)=>{
      const  {email,password} = req.body
      try {
            const currentUser = await User.findOne({email})
            if(currentUser){
            const correct = await bcrypt.compareSync(password,currentUser.password)
            console.log(correct,currentUser,password)
            if(correct){
                return  res.status(200).json({
                        status:"logged in",
                        currentUser
                  })
            }else{
                 return res.status(401).json({

                        status:"incorrect credentials",
                        message:" password is incorrect"
                  })
            }
            
            }else{
                 return res.status(404).json({
                        status:"no user found"

                  })

            }
            
      } catch (error) {
            return res.status(400).json({
                  status:"an error occurred",
                  error
            })
            
      }
}