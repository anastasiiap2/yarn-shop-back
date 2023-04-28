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

//You'll have to set your server up to return the index page on every route request
// except for api routes that need to be handled by the server.
// This should set your server up to let React Router handle deeplink requests.

// app.get('*', function (req, res) {
//     res.send('public/index.html')
// })

const readingImage = (imagePath, res) => {
    fs.readFile(imagePath, (err, image) => {
        if (err !== null) {
            console.error("Failed to read the image file" + err);
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
}

app.get("/items/:name", (req, res) => {
    fs.readFile(`./database/${req.params.name}.json`, "utf8", (err, jsonString) => {
        try {
            res.send(jsonString);
        } catch (error) {
            console.error("Failed to read the JSON file " + error);
            res.sendStatus(500);
        }
    })
})
// get images
app.get(`/image/:name/:id`, (req, res) => {
    const imagePath = __dirname + '/public/' + req.params.name + "/" + req.params.id;
    // res.sendFile(__dirname +imagePath)
    readingImage(imagePath, res)
})


app.get("/item/:id", (req, res) => {
    fs.readFile(__dirname + `/public/items/${req.params.id}.json`, "utf8", (err, jsonString) => {
        try {
            res.send(jsonString);
        } catch (error) {
            console.error("Failed to read the JSON file " + error);
            res.sendStatus(500);
        }
    })
})

app.get("/image/items/:id", (req, res) => {
    const imagePath = __dirname + '/public/items/' + req.params.id;
    readingImage(imagePath, res)
})

app.post("/cart", (req, res) => {
    fs.writeFile("test.json", res, (err) => {
        res.sendStatus(500)
        console.log(err)
    })
})

// Alternative:
// app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});