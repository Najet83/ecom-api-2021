const express = require("express")
const cors = require("cors")
const mongoose = require("./config/db")

const userController = require("./Controllers/userController")
const productController = require("./Controllers/productController")
const categoryController = require("./Controllers/categoryController")
const orderController = require("./Controllers/orderController")

const app = express()
app.use(cors())
app.use(express.json())


app.use("/user", userController)
app.use("/product", productController)
app.use("/category", categoryController)
app.use("/order", orderController)

app.listen(3000, () => {
    console.log("server started")
})