// const { append } = require("express/lib/response")

const router = require("express").Router()
const User = require("../models/userDetails")
const bcrypt = require("bcryptjs")
// const res = require("express/lib/response")


router.post("/register", async  (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password, salt),
    })
    try{
          newUser.save()
        res.status(200).json(newUser)
    }catch(err){
        console.log(err)
    // console.log(req.query)
    }

})

router.post('/login',(req,res)=>{
    const userMail= req.body.email
    const userPassword= req.body.password
     User.findOne({email: userMail},(err,found)=>{
        if(err){
            res.status(404).json("user not found")
        }else{
            const correct = bcrypt.compareSync(userPassword,found.password)
            if (correct != true){
                res.status(400).json("password mismatch")
            }else {
                res.status(200).json(found)
            }
        }
    })
})




module.exports = router