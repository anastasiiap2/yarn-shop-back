const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

fs.readFile("./yarn-db.json", "utf8", (err, jsonString) => {
    console.log(jsonString)
})

// get all items
app.get("/", (req, res) => {
    fs.readFile("./yarn-db.json", "utf8", (err, jsonString) => {
        if (err !== null) {
            console.log("Failed to read the JSON file")
            res.sendStatus(500)
            return
        }
        res.send(jsonString)
    })
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});