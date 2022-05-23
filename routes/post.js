const Post = require("../models/post");
const User = require("../models/user");

const router = require("express").Router();

//  localhost:8800/api/post

// create a Post
router.post("/", async (request, response) => {
 try {
  const post = await new Post(request.body).save();
  response.status(200).json(post)
 } catch (error) { response.status(500).json(error) }
})

//update a Post
router.put("/:id", async (request, response) => {
 try {
  const post = await Post.findById(request.params.id);
  //check userId of the post, matches with the userId of the user, if so, update
  if (post.userId === request.body.userId) {
   await post.updateOne({ $set: request.body });
   response.status(200).json("Your post has been updated!!!")
  } else {
   response.status(403).json("You can update only your Post")
  }
 } catch (error) { response.status(500).json(error) }
})

//delete a Post
router.delete("/:id", async (request, response) => {
 try {
  const post = await Post.findById(request.params.id);
  //check userId of the post, matches with the userId of the user, if so, update
  if (post.userId === request.body.userId) {
   await post.deleteOne();
   response.status(200).json("Your post has been deleted!!!")
  } else {
   response.status(403).json("You can delete only your Post")
  }
 } catch (error) { response.status(500).json(error) }
})

//like or dislike post
router.put("/:id/like", async (request, response) => {
 try {
  const post = await Post.findById(request.params.id);
  //if userId is in  post documents, that user(userId), already liked the post.
  if (!post.likes.includes(request.body.userId)) {
   await post.updateOne({ $push: { likes: request.body.userId } })
   response.status(200).json("You liked this post")
  } else {
   await post.updateOne({ $pull: { likes: request.body.userId } });
   response.status(200).json("you disliked the post")
  }
 } catch (error) { response.status(500).json(error) }

})

//get a post
router.get("/:id", async (request, response) => {
 try {
  const post = await Post.findById(request.params.id);
  response.status(200).json(post);
 } catch (error) {
  response.status(500).json(error)
 }
})

// get timeline post
router.get("/timeline/:userId", async (request, response) => {
 try {
  const currentUser = await User.findById(request.params.userId);
  //get all post of the current user // await Post.findById(currentUser._id) //wrong
  const myAllPost = await Post.find({ userId: currentUser._id })
  // all friendPost
  const friendPost = await Promise.all(currentUser.followings.map((id) => {
   return Post.find({ userId: id })
  }))

  response.status(200).json(myAllPost.concat(...friendPost))
 } catch (error) { response.status(500).json(error) }
})


// get user's all post for his/her profile page.
router.get("/profile/:username", async (request, response) => {
 try {
  const user = await User.findOne({ username: request.params.username })
  const posts = await Post.find({ userId: user._id })
  console.log(posts);
  response.status(200).json(posts)
 }
 catch (error) { response.status(500).json(error) }
})

module.exports = router;