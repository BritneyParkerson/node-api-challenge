const express = require("express")


const server = express()
server.get("/", (req, res) => {
    res.send(`Don't Worry! You Got this!`)
})