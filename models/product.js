const mongoose = require("mongoose")

const Product = mongoose.model("products", {

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    price: {
        type: Number,
        trim: true,
        required: true
        

    },
    description: {
        type: String,
        trim: true,
        required: true
        
    },
    image: {
        type: String,
        required: true
        
    },
    categoryID: {
        type: String,
        required: true
        
    }



});


    module.exports = Product