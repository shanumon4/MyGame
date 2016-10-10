var express = require("express"),
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	compress = require("compression"),
	methodOverride=require("method-override"),
	session = require("express-session"),
	config = require("./config");


module.exports = function () {
    var app = express();

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    if (process.env.NODE_ENV == "development")
        app.use(morgan('dev'));
    else if (process.env.NODE_ENV == "production")
        app.use(compress());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));


    app.set('views', './app/views');
    app.set("view engine", "ejs");

    var serverRoute = require('../app/routes/index.server.routes.js');
    serverRoute(app);
    require('../app/routes/user.server.routes.js')(app);
    require('../app/routes/card.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
}