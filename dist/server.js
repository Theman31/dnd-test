'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Bear = require('../models/Bear');

var _Bear2 = _interopRequireDefault(_Bear);

var _Food = require('../models/Food');

var _Food2 = _interopRequireDefault(_Food);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = _bluebird2.default;

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var port = process.env.PORT || 8080;
var router = _express2.default.Router();

_mongoose2.default.connection.openUri('mongodb://localhost/bears');

router.use(function (res, req, next) {
  console.log("something is happening");
  next();
});

router.get('/', function (req, res) {
  res.json({ message: "Hello, welcome to our api!" });
});

router.route('/bears').post(function (req, res) {
  var bear = new _Bear2.default();
  bear.name = req.body.name;

  bear.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Bear Created!" });
    }
  });
}).get(function (req, res) {
  _Bear2.default.find(function (err, bears) {
    if (err) {
      res.send(err);
    } else {
      res.json(bears);
    }
  });
});

router.route('/many_bears').post(function (req, res) {
  var arr = req.body['bears'];
  _Bear2.default.insertMany(arr, function (error, docs) {
    if (error) {
      next(error);
    } else {
      res.json(docs);
    }
  });
}).delete(function (req, res) {
  _Bear2.default.remove({}, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "All Bears Removed." });
    }
  });
});

router.route('/bears/:bear_id').get(function (req, res) {
  _Bear2.default.findById(req.params.bear_id, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      res.json(bear);
    }
  });
}).put(function (req, res) {
  _Bear2.default.findById(req.params.bear_id, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      bear.name = req.body.name;
      bear.alias = req.body.alias;
      bear.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Bear Saved!" });
        }
      });
    }
  });
}).delete(function (req, res) {
  _Bear2.default.remove({
    _id: req.params.bear_id
  }, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Now is dead bear." });
    }
  });
});

// Food routes

router.route('/foods').post(function (req, res) {
  var food = new _Food2.default();
  food.name = req.body.name;
  food.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Food Created!" });
    }
  });
}).get(function (req, res) {
  _Food2.default.find(function (err, foods) {
    if (err) {
      res.send(err);
    } else {
      res.json(foods);
    }
  });
});

router.route('/many_foods').post(function (req, res) {
  var arr = req.body['foods'];
  _Food2.default.insertMany(arr, function (error, docs) {
    if (error) {
      next(error);
    } else {
      res.json(docs);
    }
  });
}).delete(function (req, res) {
  _Food2.default.remove({}, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "All Foods Removed." });
    }
  });
});

router.route('/food/:food_id').get(function (req, res) {
  _Food2.default.findById(req.params.food_id, function (err, food) {
    if (err) {
      res.send(err);
    } else {
      res.json(food);
    }
  });
}).put(function (req, res) {
  _Food2.default.findById(req.params.food_id, function (err, food) {
    if (err) {
      res.send(err);
    } else {
      food.name = req.body.name;
      food.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Food Saved!" });
        }
      });
    }
  });
}).delete(function (req, res) {
  _Food2.default.remove({
    _id: req.params.food_id
  }, function (err, food) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "No more Food." });
    }
  });
});

app.use('/api', router);

app.listen(port);
console.log("magic happens on port" + port);