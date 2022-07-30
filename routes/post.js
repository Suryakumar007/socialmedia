const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User")
router.get("/", (req, res) => {
    res.status(200).send("post route");
});

//Create a Post
router.post("/createPost", async (req, res) => {
    let newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).send("Post saved successfully");
    } catch (err) {
        res.status(500).send("Some technical error happened");
    }
});

//Like or dislike a Post
router.put("/:id/like", async (req, res) => {
    try {
        let postToLike = req.params.id;
        let userID = req.body.userID;
        const post = await Post.findById(postToLike);
        if (!post.likes.includes(userID)) {
            await post.updateOne({ $push: { likes: userID } });
            res.status(201).send("Post Liked succesful");
        } else {
            await post.updateOne({ $pull: { likes: userID } });
            res.status(200).send("Post disliked");
        }
    } catch (err) {
        console.log(err, "error")
        res.status(500).json(err);
    }
});

//Fetch a Post by post ID
router.get("/:id", async (req,res)=>{
    try{
        const postToFetch = req.params.id
        const post = await Post.findById(postToFetch)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Fetch posts for Feed
router.get("/timeline/all", async (req,res)=>{
    try{
        const currentUser = await User.findById(req.body.id)
        const friendPosts = await Promise.all(
            currentUser.following.map((friendID)=>{
                return Post.find({userID : friendID}).sort({created_at : -1})
            })
        )
        await console.log(friendPosts, "Friend posts")
        await console.log(friendPosts[0], "Friend 1st element")
        res.status(200).json(friendPosts)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router;
