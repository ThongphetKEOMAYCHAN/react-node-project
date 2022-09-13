const express = require('express')
const app = express();
const cors = require("cors")
const expressSanitizer = require('express-sanitizer')

var corsOptions = {
    origin: "*",
    // ["https://paokue77.com","https://dv-paokue.netlify.app/"]
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ limit: '10mb',extended: true }));

app.use(expressSanitizer());
// app.use(express.json());

// req = request
// res = response
app.get("/", function (req, res) {
    res.send("Hello paokue");
})

app.use('/api/v1', require('./api/v1/api'));

const server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("You are running at", host, port);
    console.log("You can exactly run yor project");
})

