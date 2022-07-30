const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

//Register an user
router.post("/register", async (req, res, next) => {
  console.log(req.body, "== req body ===")

  const name = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  //generating hashed password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  //trying to store in database
  try{
    const user = await new User({
      userName: name,
      email: email,
      password: hashedPassword,
    });
  
    const result = await user.save();
     res.status(201).json(result)
  }
  catch(err){
    console.log(err,"Error")
  }
});

//Login route
router.post("/login", async (req,res)=>{
  try{
    const email = req.body.email
    const user = await User.findOne({"email" : email})
    
    if(!user){
      res.status(400).send("No user found with the given email address")
    }

    const password = req.body.password
    const validPassword = await bcrypt.compare(password,user.password)
    
    if(!validPassword){
      res.status(400).send("Sorry invalid password")
    }

    res.status(200).json(user)
  
  }
  catch(err){
    console.log(err, "Error in login route")
  }
})

module.exports = router;
