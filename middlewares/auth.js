const jwt = require("jsonwebtoken")

let isAdmin = (req, res, next) => {

    try {
        console.log(req.get("Authorization"))

        let token = req.get("Authorization")
        let decryptedToken = jwt.verify(token, "SECRETKEY")
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