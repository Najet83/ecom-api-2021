const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./../models/user")

const app = express()

app.post("/register", (req, res) => {

    let data = req.body

    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
    let user = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password
    })

    user.save()
        .then((savedUser) => {
            res.status(201).send({ message: "user saved" })

        })

        .catch((e) => {
            res.status(400).send({
                message: "user not saved",
                error: e
            })
        })

})

app.post("/login", (req, res) => {
    let data = req.body
    User.findOne({ email: data.email })
        .then((user) => {
            if (!user) {
                res.status(404).send({ message: "user not found" })
            }
            else {
                let compare = bcrypt.compareSync(data.password, user.password)
                if (!compare) res.status(404).send({ message: "user not found" })
                else {
                    let token = jwt.sign({ id: user._id, role: user.role }, "SECRETKEY")
                    res.status(200).send({ mytoken: token })
                }
            }
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })

})

app.get("/stat", (req, res) => {

    res.send(" statistiques")

})

app.get("/all", (req, res) => {

    User.find()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })

})

app.delete("/remove/:id", (req, res) => {

    res.send(" user deleted")

})

app.put("/update-state/:id", (req, res) => {

    res.send(" user state updated")

})


module.exports = app