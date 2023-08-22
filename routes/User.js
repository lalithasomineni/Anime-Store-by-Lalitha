const users = require("../models/User");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authorization = require("../middlewares/auth");
dotenv.config();
const User = require("../models/User");



router.get("/users",authorization,(req,res)=>{
   users.find().then(result=>{
    res.send(result);
   }).catch(err=>{
    res.send(err);
   })
})

router.post("/register",async (req,res)=>{
try{
   let newUser = new users({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email:req.body.email,
    password: req.body.password

   });
    await bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
    newUser.password = hash;
    newUser.save();
});
    res.json({"userName":newUser.name});
}
    catch{
        res.status(404).send("an error occured")
    }
})

router.get('/userdetails', authorization, async (req, res) => {
  console.log(req.user);
    try {
      const person = await User.findById(req.user._id);
      console.log(req.user);
      if (!person) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(person);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;

    var user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials name" });
    }

    var isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        process.env.private_key,
        {
            expiresIn: "7 days"
        }

      );
      return res.status(200).json({
        message: "Auth successful",
        token: token})
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.put("/:id",authorization,async (req,res)=>{
 await users.findByIdAndUpdate(req.params.id,
    {$set:{name:req.body.name,password:req.body.password}})
    .then(result=>{
        bcrypt.hash(result.password, saltRounds, function(err, hash) {
            result.password = hash;
            result.save();
        });
        res.send(result.password);
    }).catch(err=>{
        res.send(err);
    })
})
    /*let existingUser = await users.findById(req.params.id);
    if(existingUser){
        existingUser = {
            name : req.body.name,
            password: req.body.password
        }
         bcrypt.hash(existingUser.password, saltRounds, async function(err, hash) {
            existingUser.password = hash;
            await existingUser.save();
            res.send(existingUser);
        });
    }
    else{
    res.send("user not found")
    }

 });
    
    /*if(!existingUser) return res.send("user not found");
    else{
        existingUser = {
            name : req.body.name,
            password: req.body.password
        }
        await existingUser.save();
        res.send(existingUser);
    }*/
//})


module.exports = router;