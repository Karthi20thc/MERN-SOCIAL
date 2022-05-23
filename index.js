const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
const multer = require("multer");
const path = require("path")

const app = express();
// ------------------------------------------//
dotenv.config({ path: "./config.env" });
// console.log(process.env.MONGO_URL)

// const DB = process.env.MONGO_URL.replace(
//  "<PASSWORD>",
//  process.env.PASSWORD
// );

const DB = process.env.MONGO_URL
mongoose.connect(DB, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then((conn) => {
 console.log("DataBase Connection Successfull !!!")
})

//  check in browser http://localhost:8700/images/imagenamehere
//  if we use images path, dont make get request(default), instead go the folder.
app.use("/images", express.static(path.join(__dirname, "public/images")))

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))
app.use(cors())

// for image uploading
// const storage = multer.diskStorage({
//  destination: (req, file, cb) => {
//   cb(null, "public/images");
//  },
//  filename: (req, file, cb) => {
//   cb(null, req.body.name);
//  },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), function (request, response) {
//  try {
//   return response.status(200).json("File uploaded successfully")
//  } catch (error) { console.log(error) }
// })

// Mounting Middleware

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, "public/images");
 },
 filename: (req, file, cb) => {
  cb(null, req.body.name);
 },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
 try {
  return res.status(200).json("File uploded successfully");
 } catch (error) {
  console.error(error);
 }
});

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
 console.log(`Backend Server is running on ${port} `)
})
// server.close();
// console.log(server);