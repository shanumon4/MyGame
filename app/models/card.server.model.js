var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var CardSchema = new Schema({
    Id: Number,
    OwnerId: Number,
    HiddenChar: String,
    ImageUrl: String,
    Taken: Boolean,
    ContestDate: Date,
    CreatedOn: Date,
    CreatedBy: Number,
    ModifiedOn: Date,
    ModifiedBy: Number,
    IsDeleted: Boolean,
    ContestId: Number
}, { collection: 'Card'});

mongoose.model('Card', CardSchema);