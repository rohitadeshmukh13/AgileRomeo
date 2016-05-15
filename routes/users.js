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


    /* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;