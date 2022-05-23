const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const router = require("express").Router();

//  localhost:8800/api/users

// Update User by Id
router.put("/:id", async (request, response) => {
 // userId must match with paramater id, else return error.
 if (request.body.userId === request.params.id || request.body.isAdmin) {
  if (request.body.password) {
   try {
    //hashing the new password
    const salt = await bcryptjs.getSalt(10);
    request.body.password = await bcryptjs.hash(request.body.password, salt)
   } catch (error) {
    return res.status(500).json(error);
   }
  }
  // updating the user
  const user = User.findByIdAndUpdate(request.params.id, { $set: request.body })
  response.status(200).json("Your Account has been updated")
  try { await user } catch (error) {
   return response.status(500).json(error);
  }

 } else {
  return res.status(403).json("You can update only your account!");
 }
})

//Delete User by Id
router.delete("/:id", async (request, response) => {
 if (request.body.userId === request.params.id || request.body.isAdmin) {
  try {
   await User.findByIdAndDelete(request.params.id)
   response.status(200).json("Your Account has been deleted")
  } catch (error) {
   response.status(500).json(error)
  }
 } else { response.status(500).json("you can delete only your account") }

})

//Get User based on query
router.get("/", async (request, response) => {
 const userId = request.query.userId;
 const username = request.query.username;

 try {
  const user = userId ? await User.findById(userId) : await User.findOne({ username: username })
  // console.log(user._doc);
  const { password, updatedAt, ...others } = user._doc // To hide sensitive data
  response.status(200).json(others)
 } catch (error) {
  response.status(500).json(error)
 }
})

//get all friends
router.get("/friends/:userId", async (request, response) => {
 try {
  const user = await User.findById(request.params.userId);
  const existingUserFriendsAll = await Promise.all(user.followings.map((friendId) => {
   return User.findById(friendId)
  }))
  let friendsList = [];
  existingUserFriendsAll.map((eachFriend) => {
   const { _id, username, profilePicture } = eachFriend;
   friendsList.push({ _id, username, profilePicture })
  })

  response.status(200).json(friendsList)
 } catch (error) { response.status(500).json(error) }
})


// //follow a user
// router.put("/:id/follow", async (request, response) => {
//  if (request.body.userId !== request.params.id || request.body.isAdmin) {
//   try {
//    const otherUser = await User.findById(request.params.id);
//    const mySelf = await User.findById(request.body.userId);

//    // checking, if myself following the otherUser, if not follow
//    if (!otherUser.followers.includes(request.body.userId)) {
//     await otherUser.updateOne({ $push: { followers: request.body.userId } })
//     // also update the otherUser who is following me
//     await mySelf.updateOne({ $push: { followings: request.params.id } })
//     response.status(200).json(`You are now following ${mySelf.username}`)
//    } else {
//     response.status(403).json(`You are already following ${mySelf.username}`)
//    }
//   } catch (error) {
//    response.status(500).json(error)
//   }
//  } else {
//   response.status(403).json("You can not follow yourself")
//  }
// })

// // unfollow user
// router.put("/:id/unfollow", async (request, response) => {
//  if (request.body.userId !== request.params.id || request.body.isAdmin) {
//   try {
//    const mySelf = await User.findById(request.params.id);
//    const otherUser = await User.findById(request.body.userId);

//    // checking, if myself following the otherUser, if not follow
//    if (mySelf.followings.includes(request.body.userId)) {
//     await mySelf.updateOne({ $pull: { followings: request.body.userId } })
//     // also update the otherUser who is following me
//     await otherUser.updateOne({ $pull: { followers: request.params.id } })
//     response.status(200).json(`You unfollowed ${otherUser.username}`)
//    } else {
//     response.status(403).json(`You havent followed ${otherUser.username}, so you cant unfollow`)
//    }
//   } catch (error) {
//    response.status(500).json(error)
//   }

//  } else {
//   response.status(403).json("You can not unfollow yourself, stupid")
//  }
// })

// follow a user
router.put("/:id/follow", async (req, res) => {
 if (req.body.userId !== req.params.id) {
  try {
   const user = await User.findById(req.params.id);
   const currentUser = await User.findById(req.body.userId);
   if (!user.followers.includes(req.body.userId)) {
    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({ $push: { followings: req.params.id } });
    res.status(200).json("user has been followed");
   } else {
    res.status(403).json("you allready follow this user");
   }
  } catch (err) {
   res.status(500).json(err);
  }
 } else {
  res.status(403).json("you cant follow yourself");
 }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
 if (req.body.userId !== req.params.id) {
  try {
   const user = await User.findById(req.params.id);
   const currentUser = await User.findById(req.body.userId);
   if (user.followers.includes(req.body.userId)) {
    await user.updateOne({ $pull: { followers: req.body.userId } });
    await currentUser.updateOne({ $pull: { followings: req.params.id } });
    res.status(200).json("user has been unfollowed");
   } else {
    res.status(403).json("you dont follow this user");
   }
  } catch (err) {
   res.status(500).json(err);
  }
 } else {
  res.status(403).json("you cant unfollow yourself");
 }
})

module.exports = router;
