const mongoose = require("mongoose")

const Category = mongoose.model("categories", {

    name: {
        type: String,
        required: true,
        unique: true

    }
});


    module.exports = Category