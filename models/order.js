const mongoose = require("mongoose")

const Order = mongoose.model("orders", {

    clientID: {
        type: String,
        required: true
    },

    products: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },

    status: {
        type: String,
        default: "en cours"

    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});


module.exports = Order