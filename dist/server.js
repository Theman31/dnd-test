'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bear = require('../models/bear');

var _bear2 = _interopRequireDefault(_bear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.Promise = _bluebird2.default;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var port = process.env.PORT || 8080;
var router = _express2.default.Router();

_mongoose2.default.connect('mongodb://localhost/bears');

router.use(function (res, req, next) {
  console.log("something is happening");
  next();
});

router.get('/', function (req, res) {
  res.json({ message: "Hello, welcome to our api!" });
});

router.route('/bears').post(function (req, res) {
  var bear = new _bear2.default();
  bear.name = req.body.name;
  bear.alias = req.body.alias;

  bear.save(function (err) {
    if (err) res.send(err);
    res.json({ message: "Bear Created!" });
  });
}).get(function (req, res) {
  _bear2.default.find(function (err, bears) {
    if (err) res.send(err);
    res.json(bears);
  });
});

router.route('/bears/:bear_id').get(function (req, res) {
  _bear2.default.findById(req.params.bear_id, function (err, bear) {
    if (err) res.send(err);
    res.json(bear);
  });
}).put(function (req, res) {
  _bear2.default.findById(req.params.bear_id, function (err, bear) {
    if (err) res.send(err);
    bear.name = req.body.name;
    bear.alias = req.body.alias;
    bear.save(function (err) {
      if (err) res.send(err);
      res.json({ message: "Bear Saved!" });
    });
  });
}).delete(function (req, res) {
  _bear2.default.remove({
    _id: req.params.bear_id
  }, function (err, bear) {
    if (err) res.send(err);
    res.json({ message: "Now is dead bear." });
  });
});

app.use('/api', router);

app.listen(port);
console.log("magic happens on port" + port);