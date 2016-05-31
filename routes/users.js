var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var User=mongoose.model('User');

router.get('/api/users', function(req, res, next) {

	User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
            	res.send(err)

            res.json(users);
        });

});

	router.param('user', function(req, res, next, id) {
	  var query = User.findById(id);

	  query.exec(function (err, user){
	    if (err) { return next(err); }
	    if (!user) { return next(new Error('can\'t find user')); }

	    req.user = user;
	    return next();
	  });
	});

	router.get('/api/users/:user', function(req, res) {
		res.json(req.user);
	});

    /* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;