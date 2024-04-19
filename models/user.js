const { Schema, model } = require('mongoose');
const { createHash, randomBytes } = require("crypto");
const { createTokenForUser } = require('../service/auth');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "/images/user-avatar.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHash("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHash("sha256", salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== userProvidedHash)
        throw new Error('Incorrect password');

    const token = createTokenForUser(user);
    return token;
});

const User = model("user", userSchema);
module.exports = User;