const mongoose = require("mongoose")
const schema = mongoose.Schema

const urlSchema = new schema({
    original_url: {
        type: String,
        require: true
    },
    shorten_url: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("URL", urlSchema)