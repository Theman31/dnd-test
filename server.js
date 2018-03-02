var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Feature = require('./models/Feature');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

mongoose.connection.openUri('mongodb://localhost/dnd-test');

router.use(function(res, req, next) {
  console.log("something is happening");
  next();
});

router.get('/', function(req, res) {
  res.json({ message: "Hello, welcome to our api!"});
});

router.route('/features')
  .post(function(req, res){
    var feature = new Feature();
    feature.index = 1;
    feature.name = "STR";
    feature.full_name = "Strength";
    feature.desc = ["Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.", "A Strength check can model any attempt to lift, push, pull, or break something, to force your body through a space, or to otherwise apply brute force to a situation. The Athletics skill reflects aptitude in certain kinds of Strength checks."],
    feature.skills = [{
      "url": "http://www.dnd5eapi.co/api/skills/4",
      "name": "Athletics"
    }];
    feature.url = "http://www.dnd5eapi.co/api/ability-scores/1";

    feature.save(function(err) {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "feature created" });
      }
    });
  })
  .get(function(req, res){
    Feature.find(function(err, bears){
      if(err) {
        res.send(err);
      } else {
        res.json(bears);
      }
    });
  });

app.use('/api', router);

app.listen(port);
console.log("magic happens on port" + port);
