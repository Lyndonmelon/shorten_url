const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const port = 3000

const app = express()

app.get("/", (req, res) => {
    res.send("Express up and running.")
})


app.listen(port, () => {
    console.log("Express is up and running...")
})
