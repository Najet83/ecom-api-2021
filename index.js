const express = require("express")
const cors = require("cors")
const mongoose = require("./config/db")

const userController = require("./Controllers/userController")
const productController = require("./Controllers/productController")
const categoryController = require("./Controllers/categoryController")
const orderController = require("./Controllers/orderController")

const app = express()
app.use(cors()) // qui permet les api accessibles par d'autres serveurs
app.use(express.json())// permet de récupérer des données sous format json
app.use(express.urlencoded({
    extended: true
})); // permet de récupérer des fichiers

app.use(express.static('./public')); // fonction qui permet de rendre le dossier accessible depuis d'autres serveurs exple front-end

app.use("/user", userController)
app.use("/product", productController)
app.use("/category", categoryController)
app.use("/order", orderController)

app.listen(3000, () => {
    console.log("server started")
})