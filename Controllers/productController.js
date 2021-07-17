const express = require("express")
const Product = require("./../models/product")
const Category = require("./../models/category")

const app = express()


app.get("/one/:id", async (req, res) => {

    try {
        let productId = req.params.id

        let product = await Product.findOne({ _id: productId })

        let category = await Category.findOne({ _id: product.categoryID })

        res.status(200).send({
            ...product._doc,
            categoryName: category.name
        })
    }
    catch (e) {
        res.status(400).send({ error: e })
    }
})

app.get("/all", async (req, res) => {
    try {
        let products = await Product.find()

        for (let i = 0; i < products.length; i++) {

            let category = await Category.findOne({ _id: products[i].categoryID })
            products[i] = { ...products[i]._doc, categoryName: category.name }
        }

        res.status(200).send(products)


    }
    catch (e) {
        res.status(400).send({ error: e })
    }
})



app.get("/stat", (req, res) => {

    res.send("get all statistique products")
})


app.post("/add", (req, res) => {
    let data = req.body

    let product = new Product({
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
        categoryID: data.categoryID

    })

    product.save()
        .then((savedProduct) => {
            res.status(201).send({ message: "product added" })

        })

        .catch((e) => {
            res.status(400).send({
                message: "product not added",
                error: e
            })
        })

})

app.put("/update-info/:id", (req, res) => {
    let data = req.body
    let productId = req.params.id

    Product.findOneAndUpdate({ _id: productId }, data)
        .then((product) => {
            if (!product) {
                res.status(404).send({ message: "product not found" })
            }
            else {
                res.status(200).send({ "message": "product is updated " })
            }
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })
})

app.delete("/remove/:id", (req, res) => {
    let productId = req.params.id

    Product.findOneAndDelete({ _id: productId })
        .then((product) => {
            if (!product) {
                res.status(404).send({ message: "product not found" })
            }
            else {
                res.status(200).send({ "message": "product is deleted " })
            }
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })

})


module.exports = app