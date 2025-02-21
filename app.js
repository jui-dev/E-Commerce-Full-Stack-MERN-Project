const express = require("express");
const router = require("./src/routes/api");
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

//----------------- for database ( mongodb ) connection ----------------//

let URL =
  "mongodb+srv://jui77667:j123@cluster0.zot45.mongodb.net/MernEcommerce";
let option = { user: "jui77667", pass: "j123", autoIndex: true };

mongoose
  .connect(URL, option)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//-------- middlewares -----------//

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.set("etag", false);
app.use("/api/v1", router); // this "/api" routing is completely for the Backend Routing.

//--------------- Now from "Backend" we will be managing the "Routing" of "Frontend"---------------//
//-------- connecting the Frontend ( so that backend can work with Frontend's static files)--------------//
app.use(express.static("client/dist")); // using "static" we need to provide the Frontend directory location. || front end directory means the directory which is going to be the front end directory in the "production"|| in Production the front end directory is "client/dist"

// Add React Front End Routing // Managing frontend routing.
// * = means for anything we will target the "dist" directory's "index.html" file.|| Cause React single page application will manage everything from the "index.html" file.
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html")); // here using path.resolve we resolved the path.|| __dirname = default directory name || location -> "client" directory --> "dist" directory --> "index.html" file.
});

module.exports = app;
