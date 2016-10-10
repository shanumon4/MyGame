﻿/// <reference path="../controllers/user.server.controller.js" />
var users = require('../controllers/user.server.controller.js');

module.exports = function (app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userById);
}