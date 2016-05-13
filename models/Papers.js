var mongoose=require('mongoose');

var PaperSchema = new mongoose.Schema({
	//sprintID: Number,
	paperAuthors:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
	paperReviewer:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
	keywords:String,
	
});



mongoose.model('Paper',PaperSchema);