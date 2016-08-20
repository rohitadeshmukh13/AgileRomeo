var mongoose=require('mongoose');

var PaperSchema = new mongoose.Schema({
	_creator : { 
	 	type:mongoose.Schema.Types.ObjectId,
	 	ref: 'User'
	 },
	title:String,
	authors:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}],
	abstract:String,
	keywords:[String],
	status: {
        type: String,
        enum: ['Incomplete', 'Completed', 'Closed', 'Accepted', 'Rejected']
        // Completed - submission completed - (title, abstract, attachment) fields present
        // Closed - After the conference is over, auto changed to 'Closed'.
      },
      //,
      //file type - https://www.npmjs.com/package/mongoose-file
    /*{
    	timestamps: true	// automatically adds createdAt and updatedAt fields to the schema
	}*/
      createdAt: {
      	type: Date, 
      	required: true,
      	default: Date.now
      },
      updatedAt: {
      	type: Date,      	
      	required: true,
      	default: Date.now
      }
});



mongoose.model('Paper',PaperSchema);