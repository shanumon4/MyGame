var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	Id:Number,
    Username: String,
    Password: String,
    FirstName: String,
    LastName: String,
    PhoneNumber: String,
    Email: String,
    IsActive: Boolean,
    CreatedOn: Date,
    CreatedBy: Number,
    ModifiedOn: Date,
    ModifiedBy: Number
}, { collection: 'Users' });

mongoose.model('User', UserSchema);