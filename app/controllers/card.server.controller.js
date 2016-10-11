var Card = require('mongoose').model('Card');
var UserCard = require('mongoose').model('UserCard');
var CardSchema = Card.schema;

//CardSchema.pre('save', function (next) {
//    var self = this;
    
//    Card.findOne({ ContestId : this.ContestId }, 'ContestId', function (err, results) {
//        if (err) {
//            next(err);
//        } else if (results) {
            
//            next(new Error("email must be unique"));
//        } else {
//            next();
//        }
//    });
//});

exports.create = function (req, res, next) {
	var card = new Card(req.body);

	card.save(function (err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(card);
		}
	});
}

exports.list = function (req, res, next) {
    //console.log(Card);

    var call = function (daa) {
        //res.json(daa);
        UserCard.find({ 'ContestId': req.query.ContestId, 'UserId': req.query.UserId }, function (err, usercards) {
            if (err)
                return next(err);
            else
                calb(usercards,daa);
        });
    };
    
    var calb = function (usercard, card) {
        for (var i = 0; i < card.length; i++) {
            var foundCards = usercard.find(function (j) { return j.CardId == card[i].Id });
            //if (foundCards) { 
            card[i].Taken = foundCards ? true:false;
            //}
            
        }

        res.json(card);
    };
    Card.find({ 'ContestId': req.query.ContestId }, 'OwnerId Id HiddenChar Taken CreatedOn', function (err, cards) {
        if (err)
            return next(err);
        else
            call(cards);
    });
}

exports.read = function (req, res) {
	res.json(req.card);
}

exports.cardById = function (req, res, next, id) {
	Card.findOne({
		'_id': id
	}, function (err, card) {
		if (err)
			return next(err);
		else {
			req.card = card;
			next();
		}
	});
}

exports.update = function (req, res, next) {
    Card.findByIdAndUpdate(req.card.id, req.body, function (err, card) {
        if (err)
            return next(err);
        else {
            var query = {
                UserId: 1,
                ContestId : card.ContestId,
                OpenDate: new Date(),
                userTaken: card.OwnerId,
                userHidChar: card.HiddenChar,
                CreatedBy: card.CreatedBy,
                CreatedOn: new Date(),
                ModifiedBy: card.CreatedBy,
                ModifiedOn: new Date(),
                IsDeleted: false
            };
            var userCard = new UserCard(query);
            
            userCard.save(function (err, data) {
                if (err) { 
                    return next(err);
                }
                else
                    res.json(data);
            });
               
        }
		
    });
}

exports.unlockCard = function (req, res, next) {
    var cardId = req.body.CardId,
        userId = req.body.UserId,
        contestId = req.body.ContestId;
        
    UserCard.find({ 'UserId': userId, 'ContestId':contestId }, function (err, data) {
        if (err)
            return next(err);
        else {

            console.log(data.length);
            if (!data.length) {
                Card.findOneAndUpdate({ 'Id': cardId }, { 'Taken': true, 'OwnerId': userId }, function (error, da) {
                    if (error)
                        return next(error);
                    else { 
                        console.log('da: '+da);
                        var newUserCard = new UserCard(req.body);
                        newUserCard.save(function (e, r) {
                            if (e)
                                return next(e);
                            else {
                                console.log('r: ' + r);
                                res.json(r);
                            }
                        });
                    }
                });

                
            }
            else { 
                var newUserCard = new UserCard(req.body);
                newUserCard.save(function (e, r) {
                    if (e)
                        return next(e);
                    else {
                        console.log('r: ' + r);
                        res.json(r);
                    }
                });
            }
        }
    });

}
//exports.delete = function (req, res, next) {
//	req.user.remove(function (err, user) {
//		if (err)
//			return next(err);
//		else
//			res.json(user);
//	});
//}