var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var UserCardSchema = new Schema({
    
    Id: Number,
    UserId: Number,
    CardId: Number,
    CO: { type: Date, default: Date.now },
    CB: Number,
    MO: Date,
    MB: Number,
    ContestId: Number
}, { collection: 'UserCards' });


mongoose.model('UserCard', UserCardSchema);