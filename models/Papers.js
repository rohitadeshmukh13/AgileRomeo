var mongoose=require('mongoose');

var PaperSchema = new mongoose.Schema({
	title:String,
	paperAuthors:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}],
	paperReviewer:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}],
	abstract:String,
	keywords:[String],
	status: {
        type: String,
        enum: ['Incomplete', 'Completed', 'Closed', 'Accepted', 'Rejected']
        // Completed - submission completed - every field filled
        // Closed - After the conference is over, auto changed to 'Closed'.
      }
      //,
      //file type - https://www.npmjs.com/package/mongoose-file
});



mongoose.model('Paper',PaperSchema);