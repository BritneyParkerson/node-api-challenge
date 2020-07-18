const express = require("express")
const ActRoute = require("./routes/ActRoute");
const ProRoute = require("./routes/ProRoute");

const server = express();
server.get("/", (req, res) => {
    res.send(`Don't Worry! You Got this!`);
});

server.use(express.json())
server.use("/api/actions", ActRoute)
server.use("/api/projects", ProRoute)

module.export = server;