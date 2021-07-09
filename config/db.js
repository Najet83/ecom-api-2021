const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://root:root@cluster0.elyfd.mongodb.net/ecom?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
    .then(() => {

        console.log("connected to data base")

    })
    .catch(() => {
        console.log("error to connect to data base")

    })

module.exports = mongoose