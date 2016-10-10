process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require("./config/express"),
    mongoose = require("./config/mongoose");

var db = mongoose();
var app = express();
app.listen(3000);
module.exports=app;

console.log(process.env.NODE_ENV);
console.log('Mean app server running @ http://localhost:3000');