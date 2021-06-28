const express = require("express")

const app = express()


app.get("/one/:id", (req, res) => {
    let productId = req.params.id
    console.log("product id " + productId)
    res.send("product with id"+ productId)
})

app.get("/all", (req, res) => {
    
    res.send("get all products")
})



app.get("/stat", (req, res) => {
    
    res.send("get all statistique products")
})


app.post("/add", (req, res) => {
    let data = req.body
    console.log("product details: " + data)
    res.send("product added")
})

app.put("/update-info/:id", (req, res) => {
    let data = req.body
    res.send("informations of product id: "+ req.params.id + " are updated ")
})

app.delete("/remove/:id", (req, res) => {
    let productId = req.params.id
    res.send("product with id: "+ productId + " is removed")
})


module.exports=app