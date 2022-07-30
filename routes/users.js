const router = require("express").Router()
const User = require("../models/User")
router.get("/", (req,res,next)=>{
    res.send("Users home page")
})

//Following a user
router.put("/:id/follow", async(req,res)=>{
    try{
        let idToFollow = req.body.id
        let currentUserID = req.params.id

        console.log(idToFollow)
        console.log(currentUserID)
    
        if(idToFollow != currentUserID){
            let user = await User.findById(idToFollow)
            let currentUser = await User.findById(currentUserID)
    
            if(!user.followers.includes(currentUserID)){
                await user.updateOne({$push:{followers:currentUserID}})
                await currentUser.updateOne({$push:{following:idToFollow}})
                res.status(200).send("Follow request successful!")
            }
            else{
                res.status(400).send("You already follow this User")
            }
        }
        else{
            res.status(400).send("One cannot follow themselves")
        }
    }
    catch(err){
        console.log(err, "Error")
        res.status(500).send("Some technical error happened")
    }

})

router.put("/:id/unfollow", async(req,res)=>{
    try{
        let idToFollow = req.body.id
        let currentUserID = req.params.id

        console.log(idToFollow)
        console.log(currentUserID)
    
        if(idToFollow != currentUserID){
            let user = await User.findById(idToFollow)
            let currentUser = await User.findById(currentUserID)
    
            if(user.followers.includes(currentUserID)){
                await user.updateOne({$pull:{followers:currentUserID}})
                await currentUser.updateOne({$pull:{following:idToFollow}})
                res.status(200).send("Unfollow request successful!")
            }
            else{
                res.status(400).send("You cannot unfollow someone who you don't follow")
            }
        }
        else{
            res.status(400).send("One cannot unfollow themselves")
        }
    }
    catch(err){
        console.log(err, "Error")
        res.status(500).send("Some technical error happened")
    }

})

module.exports = router