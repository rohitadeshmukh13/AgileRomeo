var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var User=mongoose.model('User');

router.get('/api/users', function(req, res, next) {

        // use mongoose to get all todos in the database
        User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all todos in JSON format
        });
    });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


// var express = require('express');
// var router = express.Router();
// //var app = express();
// var mongoose= require('mongoose');

// var User=mongoose.model('User');

// router.get('/api/users', function(req, res) {

//         // use mongoose to get all todos in the database
//         User.find(function(err, users) {

//             // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err)

//             res.json(users); // return all todos in JSON format
//         });
//     });

// module.exports = router;