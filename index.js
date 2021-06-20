const express = require("express")

const app = express()
app.use(express.json())

app.get("/user", (req, res) => {
    res.send("Hello API")
})




app.get("/product/:id", (req, res) => {
    let productId = req.params.id
    console.log("product id " + productId)
    res.send("API works")
})

app.post("/user/register", (req, res) => {
    let data = req.body
    console.log(data)
    res.send("API works")

})









app.listen(3000, () => {
    console.log("server started")
}
)