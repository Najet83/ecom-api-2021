const express = require("express")

const app = express()


app.get("/one/:id", (req, res) => {
    let orderId = req.params.id
    console.log("order id " + orderId)
    res.send("order with id"+ orderId)
})

app.get("/all", (req, res) => {
    
    res.send("get all orders")
})

app.get("/all/:userId", (req, res) => {
    
    res.send("get all orders of the user:" + req.params.userId)
})

app.get("/stat", (req, res) => {
    
    res.send("get all statistique orders")
})


app.post("/add", (req, res) => {
    
    let data = req.body
    
    console.log("order details: " + data)
    res.send("order is added")
})

app.put("/update-state/:id", (req, res) => {
    let status = req.body.status
    res.send("informations of order id:"+ req.params.id + "are updated with status:"+ status)
})




module.exports = app