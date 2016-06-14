var mongoose=require('mongoose');

var PaperSchema = new mongoose.Schema({
	_creator : { 
	 	type:mongoose.Schema.Types.ObjectId,
	 	ref: 'User'
	 },
	title:String,
	paperAuthors:[{
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
      //  createdAt: {type: Date, default: Date.now}, - https://scotch.io/tutorials/build-a-mean-stack-file-uploader-app-with-filestack#the-server
});



mongoose.model('Paper',PaperSchema);