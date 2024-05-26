const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    try {

        const token = req.headers.authorization;
console.log("rrrr",req.headers,req.authorization)
        if (!token) {
            return res.status(401).send("Access Denied!");
        }

        const decode = jwt.verify(token, "secret");

        req.userId = decode.userId;
        next();
    } catch (error) {

        res.status(400).send("invalid Token!!!!!!")

    }



}

module.exports= { verifyAuth }