const http = require('http');

const hostname = '127.0.0.1';
const path = require("path");
const port = 3000;
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const _ = require('lodash');

app.use(cors());
app.use(bodyParser.json());

// get all items
app.get("/items", (req, res) => {
    fs.readFile("./database/knitting-needles.json", "utf8", (err, jsonString) => {
        if (err !== null) {
            console.log("Failed to read the JSON file");
            res.sendStatus(500);
            return;
        }
        res.send(jsonString);
    })
})

// Alternative:
// app.use(express.static(path.join(__dirname, 'database')))

app.get(`/image/:id`, (req, res) => {
    const imagePath = __dirname + '/public/knitting-needles/' + req.params.id;

    // res.sendFile(__dirname +imagePath)

    fs.readFile(imagePath, (err, image) => {
        if (err !== null) {
            console.log("Failed to read the image file");
            res.sendStatus(500);
            return;
        }
        if (!image) {
            res.sendStatus(404);
            return;
        }
        res.set('Content-Type', 'image/png')
        res.send(image)
    })
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});