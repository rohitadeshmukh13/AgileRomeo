var express = require('express');
var router = express.Router();

/*router.get('/home',function(req,res){
  res.sendfile('home');
});*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
