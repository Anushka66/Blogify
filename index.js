const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog")
const { checkForAuthenticationCookie } = require('./middlewares/auth');
require("dotenv").config();


const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error(error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});