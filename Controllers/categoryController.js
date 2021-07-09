const express = require("express")
const Category = require("./../models/category")
const { isAdmin } = require("./../middlewares/auth")

const app = express()

app.get("/one/:id", (req, res) => {
    let categoryId = req.params.id

    Category.findOne({ _id: categoryId })
        .then((category) => {
            res.status(200).send({
                message: "category info are :",
                category: category
            })
        })
        .catch((e) => {
            res.status(400).send({
                error: e
            })
        })

})

app.get("/all", (req, res) => {

    Category.find()
        .then((categories) => {
            res.status(200).send(categories)
        })
        .catch((e) => {
            res.status(400).send({
                error: e
            })
        })
})

app.get("/stat", (req, res) => {

    res.send("get all statistique categories")
})

app.post("/add", isAdmin, (req, res) => {
    let data = req.body

    let category = new Category({
        name: data.name
    })

    category.save()
        .then((savedCategory) => {
            res.status(201).send({ message: "category added" })

        })

        .catch((e) => {
            res.status(400).send({
                message: "category not added",
                error: e
            })
        })

})

app.put("/update-info/:id", (req, res) => {
    let data = req.body
    let categoryId = req.params.id


    Category.findOneAndUpdate({ _id: categoryId }, data)
        .then((category) => {
            if (!category) {
                res.status(404).send({ message: "category not found" })
            }
            else {
                res.status(200).send({ "message": "category is updated " })
            }
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })
})

app.delete("/remove/:id", (req, res) => {
    let categoryId = req.params.id


    Category.findOneAndDelete({ _id: categoryId })
        .then((category) => {
            if (!category) {
                res.status(404).send({ message: "category not found" })
            }
            else {
                res.status(200).send({ "message": "category is deleted " })
            }
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })

})


module.exports = app