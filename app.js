let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const restful = require('node-restful'),
    mongoose = restful.mongoose;
require('dotenv').config();
const strings = require('./strings');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_STRING, {
        promiseLibrary: Promise,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then((out) => console.log("MongoDB Connected...."));
let port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/*+json'}));
app.use(bodyParser.text());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

strings.app = app;
let l = require("./loader");

app.listen(port, function () {
    console.log('app listening on port:' + port);
});
module.exports = app;
