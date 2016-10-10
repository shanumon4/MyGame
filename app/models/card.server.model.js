var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var CardSchema = new Schema({
	OwnerId: Number,
	HiddenChar: String,
	ImageUrl: String,
	Taken: Boolean,
	ContestDate: Date,
	ContestId: Number,
	CreatedBy: Number,
	CreatedOn: Date,
	ModifiedBy: Number,
	ModifiedOn: Date,
	IsDeleted:Boolean
});

mongoose.model('Card', CardSchema);