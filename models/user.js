
const mongoose = require("mongoose")

const User = mongoose.model("users", {

    firstname: {
        type: String,
        required: true,
        trim: true

    },

    lastname: {
        type: String,
        required: true,
        trim: true

    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    role: {
        type: String,
        default: "client"

    }

})

module.exports = User