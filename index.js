const express = require("express")
const userController = require("./Controllers/userController")

const app = express()

app.use(express.json())
app.use("/user", userController)

app.get("/product/:id", (req, res) => {
    let productId = req.params.id
    console.log("product id " + productId)
    res.send("API works")
})

app.listen(3000, () => {
    console.log("server started")
})