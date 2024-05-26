const express = require("express");
const fs = require("fs")
const path = require("path")
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const uri = "mongodb+srv://kishor:Durva@cluster0.mirndhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const port = 3000;

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a",
})

const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
    flags: "a",
})


const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

app.use((req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()}`

    console.log(req.originalUrl, time)

    const log = `${req.method}  ${req.originalUrl}`
    logStream.write(log +" "+time+ "\n")

    next()
})
app.use("/api/auth", authRoutes)
app.use("/api/job", jobRoutes)


app.get("/", (req, res) => {

    res.send("Hello World").status()
})

app.use((err,req,res,next)=>{
  
    const now = new Date();
    const time = `${now.toLocaleDateString()}`

    console.log(req.originalUrl, time)

    const log = `${req.method}  ${req.originalUrl}`
    errorStream.write(log +" "+time+ "\n")
    res.status(500).send("Internal Server Error!!!!!")
})

app.use((req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()}`

    console.log(req.originalUrl, time)

    const log = `${req.method}  ${req.originalUrl}`
    errorStream.write(log +" "+time+ "\n")
    res.status(404).send("Route Not Found")
})
mongoose.connect(uri).then(()=>console.log("Database connected"))
.catch((err)=>console.log(err));

app.listen(port, () => console.log("Server running on " + port))