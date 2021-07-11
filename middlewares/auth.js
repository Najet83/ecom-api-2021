const jwt = require("jsonwebtoken")

let isAdmin = (req, res, next) => {

    try {
        let token = req.get("Authorization")
        let decryptedToken = jwt.verify(token, "SECRETKEY")
        console.log(decryptedToken);
        if (decryptedToken.role == "admin") {
            next()
        }
        else {
            res.status(400).send({ message: "You are not authorized" })
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
}




module.exports = { isAdmin }