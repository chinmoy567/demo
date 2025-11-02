// coremodules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");


// External modules
const storeRoute = require("./routes/storeRouter");
const authRoute = require("./routes/authRouter");
const profileRoute = require("./routes/profileRouter");
const dashboardRoute = require("./routes/dashboardRouter");


const app = express();
const port = process.env.SERVER_PORT;


// Session management
app.use(
  session({
    secret: "superSecretKey", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions", 
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    },
  })
);





//for views
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Middlewares
app.use((req, res, next) => {
  res.locals.currentPath = req.path; 
  next();
});
app.use("/", storeRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/dashboard", dashboardRoute);



// Start the server
app.listen(port, () => {
  console.log(` Server running on: http://localhost:${port}`);
});
