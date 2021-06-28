const express = require("express")

const app = express()

app.get("/one/:id", (req, res) => {
    let categoryId = req.params.id
    console.log("category id " + categoryId)
    res.send("category with id"+ categoryId)
})

app.get("/all", (req, res) => {
    
    res.send("get all categories")
})

app.get("/stat", (req, res) => {
    
    res.send("get all statistique categories")
})

app.post("/add", (req, res) => {
    let data = req.body
    
    console.log("category details: " + data)
    res.send("categoryis added")
})

app.put("/update-info/:id", (req, res) => {
    let data = req.body
    res.send("informations of category id:"+ req.params.id + "are updated ")
})

app.delete("/remove/:id", (req, res) => {
    let categoryId = req.params.id
    res.send("category with id:"+ categoryId + "is removed")
})


module.exports=app