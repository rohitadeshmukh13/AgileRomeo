var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var Paper=mongoose.model('Paper');
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
            keywords : req.body.keywords
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