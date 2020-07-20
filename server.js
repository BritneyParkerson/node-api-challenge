const express = require('express');
const server = express();
const actionRouter = require('./data/actionRouter');
const projectRouter = require('./data/projectRouter');

server.use(express.json())
server.use('/api/project', projectRouter);
server.use('/api/action', actionRouter);


server.get("/", (req, res) => {
    res.send(`Don't Worry! You Got this!`);
});



module.exports = server; 
