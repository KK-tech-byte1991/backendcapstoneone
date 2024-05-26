const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const registerUser = async (req, res) => {

    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).send("Please fill all the fields!!!")
        }

        const isUserExist = (await User.findOne({ email })) || (await User.findOne({ mobile }));

        if (isUserExist) {
            return res.status(400).send("User already Exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
        })

        await newUser.save();
        res.status(201).send("User Registered Successfully");
    } catch {
        next(err)
    }



};

const loginuser = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("please fill all the fields")

        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or Password!!!!!")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).send("Invalid email or Password!!!!!")
        }

        const token = jwt.sign({ userId: user._id }, "secret", {
            expiresIn: "240h"
        })

        res.status(200)
            .send({
                token,
                userId: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
            })

    } catch (error) {
        next(error)
    }
}

const allUsers = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Please fill all the fields")
        }

        if (email === "admin" && password === "admin") {
            const users = await User.find();
            return res.status(200).json(users);
        } else {
            return res.status(400).send("invalid email or password!!!")
        }

        // const users = await user.find();
        // res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}


module.exports = { registerUser, loginuser, allUsers }