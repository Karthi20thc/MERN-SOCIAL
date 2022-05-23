const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/user")

//  localhost:8800/api/auth

//register a user
router.post("/register", async (request, response) => {
 const { username, email, password } = request.body;

 // Generate new Password
 const salt = await bcryptjs.genSalt(10);
 const hashedPassword = await bcryptjs.hash(password, salt);

 // await User.create //check the difference b/w Model.create and new Model 
 const newUser = await new User({
  username: username,
  email: email,
  password: hashedPassword
 })

 try {
  const user = await newUser.save();
  response.status(200).json(user);

 } catch (error) { console.log(error) }
})

// login a user
router.post("/login", async (request, response) => {
 try {
  const { email, password } = request.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
   return response.status(400).json("user not found ");
  }
  const isPassword = await bcryptjs.compare(password, foundUser.password)
  if (!isPassword) {
   return response.status(400).json("wrong Password !")
  }

  response.status(200).json(foundUser);
 } catch (error) {
  response.status(500).json(error)
 }

})

module.exports = router;