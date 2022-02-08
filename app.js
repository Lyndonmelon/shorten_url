const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
require("./config/mongoose")
const URL = require("./models/URL")
const shorten_url = require("./utils/shorten_rul")
const port = 3000

const app = express()

// implement engines
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

// routers
app.get("/", (req, res) => {
    res.render("index")
})

app.post("/", (req, res) =>{
    if (!req.body.url){
        return res.redirect("/")
    }

    let s_url = shorten_url(5)
    URL.findOne({ original_url: req.body.url})
        .then(data => {
            if (!data) {
                URL.create({ shorten_url: s_url, original_url: req.body.url })
                    .then(res.render("result", { origin: req.headers.host, shorten_url: s_url }))
            } else {
                res.render("result", { origin: req.headers.host, shorten_url: data.shorten_url })
            }
        })
        .catch((error) => console.log(error))
})

app.get("/:URL_id", (req, res) => {
    const id = req.params.URL_id
    URL.findOne({ shorten_url: id})
        .then(data => {
            if (!data) {
                res.render("error", {
                    errorMsg: "Can't found the Given URL",
                    errorURL: req.headers.host + "/" + id
                })
            } else {
                res.redirect(data.original_url)
            }
        })
        .catch(error => console.log(error))
})


app.listen(port, () => {
    console.log("Express is up and running...")
})
