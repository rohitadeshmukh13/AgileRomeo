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
            title : req.body.title
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


module.exports = router;