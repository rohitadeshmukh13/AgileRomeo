var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var Paper=mongoose.model('Paper');
var User=mongoose.model('User');
// get, create, delete

router.get('/api/papers', function(req, res, next) {

	Paper.find(function(err, papers) {

            if (err)
            	res.send(err)

            res.json(papers);
        });

});

	router.post('/api/papers', function(req, res) {

        // create a paper, information comes from AJAX request from Angular
        Paper.create({
            title : req.body.title,
            //paperAuthors : req.body.authors,
            abstract : req.body.abstract,
            keywords : req.body.keywords,

            _creator : req.body.creator,
            paperAuthors : req.body.authors // need to push? Paper.paperAuthors.push()?
        }, function(err, paper) {
            if (err)
                res.send(err);
            else {
                    for (var i = 0; i < req.body.authors.length; i++){
                        paper.paperAuthors.push(req.body.authors[i]);
                        paper.save(function(err) {
                            if (err)
                                res.send(err);

                            //res.json(paper);
                        });
                    }


                // After creation of paper, update paperAuthors' profiles to add papersAuthored
                // for all UserObj.papersAuthored.push(paper);

                // for (var i = 0; i < paper.paperAuthors.length; i++){

                //     paper.paperAuthors[i].push(paper);
                    
                    // User
                    // .find({_id : paper.paperAuthors[i]._id})
                    // .exec(function(err, user){

                    //     console.log('#  User:::::::::: ', user);

                    //     user.papersAuthored.push(paper);

                    //     user.save(function(err) {
                    //         if (err)
                    //             res.send(err);

                    //         res.json(user);
                    //     });
                    // });

                    // }
                }

            });

    });

	// update a paper
	router.put('/api/papers/:paper_id', function(req, res) {

		Paper.findById(req.params.paper_id, function(err, paper) {
			if (err)
				res.send(err);

		    // Update the existing paper
		    paper.title = req.body.title;

		    // Save the paper and check for errors
		    paper.save(function(err) {
		    	if (err)
		    		res.send(err);

		    	res.json(paper);
		    });
		});
	});

    // delete a paper
    router.delete('/api/papers/:paper_id', function(req, res) {
        Paper.remove({
            _id : req.params.paper_id
        }, function(err, paper) {
            if (err)
                res.send(err);

            // get and return all the papers after you create another
            Paper.find(function(err, papers) {
                if (err)
                    res.send(err)
                res.json(papers);
            });
        });
    });

	// retrieve a single paper
	router.param('paper', function(req, res, next, id) {
	  var query = Paper.findById(id);

	  query.exec(function (err, paper){
	    if (err) { return next(err); }
	    if (!paper) { return next(new Error('can\'t find paper')); }

	    req.paper = paper;
	    return next();
	  });
	});

	router.get('/api/papers/:paper', function(req, res) {
		res.json(req.paper);
	});


module.exports = router;