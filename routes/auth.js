const express = require("express");
const router = express.Router();

const { registerUser,loginuser,allUsers } = require("../controllers/user")

router.get("/", (req, res) => {
    res.status(200).send("Authh Route!");
});

router.post("/register", registerUser);

router.post("/login", loginuser)

router.get("/all",allUsers)
module.exports = router