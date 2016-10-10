var Card = require('mongoose').model('Card');
var UserCard = require('mongoose').model('UserCard');
var CardSchema = Card.schema;

CardSchema.pre('save', function (next) {
    var self = this;
    
    Card.findOne({ ContestId : this.ContestId }, 'ContestId', function (err, results) {
        if (err) {
            next(err);
        } else if (results) {
            
            next(new Error("email must be unique"));
        } else {
            next();
        }
    });
});

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
	console.log(Card);
	Card.find({}, function (err, cards) {
		if (err)
			return next(err);
		else
			res.json(cards);
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

//exports.delete = function (req, res, next) {
//	req.user.remove(function (err, user) {
//		if (err)
//			return next(err);
//		else
//			res.json(user);
//	});
//}