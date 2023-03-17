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
}



// get all items

app.get("/items/crochet-hooks", (req, res) => {
    fs.readFile("./database/crochet-hooks.json", "utf8", (err, jsonString) => {
        if (err !== null) {
            console.log("Failed to read the JSON file");
            res.sendStatus(500);
            return;
        }
        res.send(jsonString);
    })
})

app.get("/items/knitting-needles", (req, res) => {
    fs.readFile("./database/knitting-needles.json", "utf8", (err, jsonString) => {
        if (err !== null) {
            console.log("Failed to read the JSON file");
            res.sendStatus(500);
            return;
        }
        res.send(jsonString);
    })
})
// app.get("/items/auxiliary-tools", (req, res) => {
//     fs.readFile("./database/auxiliary-tools.json", "utf8", (err, jsonString) => {
//         if (err !== null) {
//             console.log("Failed to read the JSON file");
//             res.sendStatus(500);
//             return;
//         }
//         res.send(jsonString);
//     })
// })

app.get(`/image/knitting-needles/:id`, (req, res) => {
    const imagePath = __dirname + '/public/knitting-needles/' + req.params.id;
    // res.sendFile(__dirname +imagePath)
    readingImage(imagePath, res)
})

app.get(`/image/crochet-hooks/:id`, (req, res) => {
    const imagePath = __dirname + '/public/crochet-hooks/' + req.params.id;
    // res.sendFile(__dirname +imagePath)
    readingImage(imagePath, res)
})

// app.get(`/image/auxiliary-tools/:id`, (req, res) => {
//     const imagePath = __dirname + '/public/crochet-hooks/' + req.params.id;
//     // res.sendFile(__dirname +imagePath)
//     readingImage(imagePath)
// })

// Alternative:
// app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});