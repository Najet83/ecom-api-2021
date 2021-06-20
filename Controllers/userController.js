const express = require("express")

const app = express()
app.use(express.json())

app.post("/register", (req, res) => {
    let data = req.body
    console.log(data)
    res.send("API works")

})

module.exports=app