const express = require("express");
const router = express.Router();

const {verifyAuth} = require("../middleware/verifyAuth");

const {createJob} = require("../controllers/job")

router.get("/", (req, res) => {
    res.status(200).send("Job Route!");
});

router.post("/create", verifyAuth, createJob)

module.exports = router