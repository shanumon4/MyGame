var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var UserCardSchema = new Schema({
    UserId: String,
    ContestId: String,
    OpenDate: Date,
    userTaken: Boolean,
    userHidChar: String,
    CreatedBy: Number,
    CreatedOn: Date,
    ModifiedBy: Number,
    ModifiedOn: Date,
    IsDeleted: Boolean
});


mongoose.model('UserCard', UserCardSchema);