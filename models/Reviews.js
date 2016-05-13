var mongoose=require('mongoose');

var ReviewSchema = new mongoose.Schema({
	//sprintID: Number,
	forPaper: [{type:mongoose.Schema.Types.ObjectId,ref:'Paper'}],
	doneBy: [{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
	summary : String,
	overallRating:String,
	reviewerExpertise:String,
	strongPoints:String,
	weakPoints:String,
	detailedComments:String
});



mongoose.model('Review',ReviewSchema);