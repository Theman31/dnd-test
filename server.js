var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

var Bear = require('./models/bear');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

mongoose.connection.openUri('mongodb://localhost/bears');

router.use(function(res, req, next) {
  console.log("something is happening");
  next();
})

router.get('/', function(req, res) {
  res.json({ message: "Hello, welcome to our api!"})
})


router.route('/bears')

  .post(function(req, res){
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err) {
        if(err)
          res.send(err);
        res.json({ message: "Bear is made, now is new Bear." })
      })
    })


  .get(function(req, res){
    Bear.find(function(err, bears){
      if(err)
        res.send(err)
      res.json(bears)
    })
  })

router.route('/bears/:bear_id')

  .get(function(req, res){
    Bear.findById(req.params.bear_id, function(err, bear){
      if(err)
        res.send(err);
      res.json(bear)
    });
  })

  .put(function(req,res){
    Bear.findById(req.params.bear_id, function(err, bear){
      if(err)
        res.send(err);
      bear.name = req.body.name;

      bear.save(function(err) {
        if(err)
          res.send(err);
        res.json({ message: "Bear was saved very good" })
      })
    })
  })

  .delete(function(req, res){
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if(err)
        res.send(err);
        res.json({ message: "Now is dead bear."});
    });
  });

app.use('/api', router);

app.listen(port);
console.log("magic happens on port" + port);
