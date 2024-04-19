const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Dynamic destination path based on user's name
        const userUploadDir = path.resolve(`./public/images`);
        if (!fs.existsSync(userUploadDir)) {
            fs.mkdirSync(userUploadDir, { recursive: true });
        }
        //callback funtion (error , result(path))
        cb(null, userUploadDir);
    },
    filename: function (req, file, cb) {
        //Creating a unique filename using Date.now()
        const fileName = `${Date.now()}-${file.originalname}`;
        //callback-function (error , filename)
        cb(null, fileName);
    },
});

//Instance of Multer
const upload = multer({ storage: storage });

router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/signin", async (req, res) => {
    return res.render("signin");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie('token',token).redirect("/");
    } catch (error) {
        return res.render('signin',{ error: "Incorrect Mail or Password"})
    }
});

router.post("/signup",upload.single("profileImage"), async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
    await User.create({
        name,
        email,
        password,
    });
    if(req.file){
        profileImage= `/images/${req.file.filename}`;
        const user= await User.findOneAndUpdate(
            {email},
            {profileImage},
            {
                new: true,
            }
        );
    }
    return res.redirect("signin");
});

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/")
})

module.exports = router;