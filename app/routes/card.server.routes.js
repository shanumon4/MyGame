/// <reference path="../controllers/user.server.controller.js" />
var cards = require('../controllers/card.server.controller.js');

module.exports = function (app) {
    app.route('/cards')
        .post(cards.create)
        .get(cards.list);
    
    app.route('/cards/unlockCard')
        .post(cards.unlockCard);

    app.route('/cards/:cardId')
        .get(cards.read)
        .put(cards.update);
    /*
        .delete(cards.delete);*/

    app.param('cardId', cards.cardById);
}