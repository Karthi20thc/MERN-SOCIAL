const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 username: {
  type: String,
  unique: true,
  require: true,
  min: 3,
  max: 20,

 },
 email: {
  type: String,
  unique: true,
  require: true,
  max: 50,

 },
 password: {
  type: String,
  unique: true,
  require: true,
  min: 6,
  // select: false
 },
 profilePicture: {
  type: String,
  default: ""
 },
 coverPicture: {
  type: String,
  default: ""
 },
 followers: {
  type: Array,
  default: []
 },
 followings: {
  type: Array,
  default: []
 },
 isAdmin: {
  type: Boolean,
  default: false
 },
 description: {
  type: String,
  max: 50
 },
 city: {
  type: String,
  max: 50
 },
 from: {
  type: String,
  max: 50
 },
 relationShip: {
  type: String,
  enum: [1, 2, 3]
 },

}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)