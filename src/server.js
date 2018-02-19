import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

import Bear from '../models/Bear';
import Food from '../models/Food';

mongoose.Promise = bluebird;

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

mongoose.connection.openUri('mongodb://localhost/bears');

router.use((res, req, next) => {
  console.log("something is happening");
  next();
});

router.get('/', (req, res) => {
  res.json({ message: "Hello, welcome to our api!"});
});

router.route('/bears')
  .post((req, res) => {
    let bear = new Bear();
    bear.name = req.body.name;

    bear.save((err) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "Bear Created!" });
      }
    });
  })
  .get((req, res) => {
    Bear.find((err, bears) => {
      if(err){
        res.send(err);
      } else {
        res.json(bears);
      }

    });
  });

router.route('/many_bears')
  .post((req, res) => {
    var arr = req.body['bears'];
    Bear.insertMany(arr,function(error, docs) {
      if(error) {
        next(error);
      } else {
        res.json(docs);
      }
    });
  })
  .delete((req, res) => {
    Bear.remove({}, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "All Bears Removed."});
      }
    });
  });

router.route('/bears/:bear_id')
  .get((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        res.json(bear);
      }
    });
  })
  .put((req,res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        bear.name = req.body.name;
        bear.alias = req.body.alias;
        bear.save((err) => {
          if(err) {
            res.send(err);
          } else {
            res.json({ message: "Bear Saved!" });
          }
        });
      }
    });
  })
  .delete((req, res) => {
    Bear.remove({
      _id: req.params.bear_id
    }, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "Now is dead bear."});
      }
    });
  });

// Food routes

router.route('/foods')
  .post((req, res) => {
    let food = new Food();
    food.name = req.body.name;
    food.save((err) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "Food Created!" });
      }
    });
  })
  .get((req, res) => {
    Food.find((err, foods) => {
      if(err) {
        res.send(err);
      } else {
        res.json(foods);
      }
    });
  });

router.route('/many_foods')
  .post((req, res) => {
    var arr = req.body['foods'];
    Food.insertMany(arr,function(error, docs) {
      if(error) {
        next(error);
      } else {
        res.json(docs);
      }
    });
  })
  .delete((req, res) => {
    Food.remove({}, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "All Foods Removed."});
      }
    });
  });

router.route('/food/:food_id')
  .get((req, res) => {
    Food.findById(req.params.food_id, (err, food) => {
      if(err) {
        res.send(err);
      } else {
        res.json(food);
      }

    });
  })
  .put((req,res) => {
    Food.findById(req.params.food_id, (err, food) => {
      if(err) {
        res.send(err);
      } else {
        food.name = req.body.name;
        food.save((err) => {
          if(err) {
            res.send(err);
          } else {
            res.json({ message: "Food Saved!" });
          }
        });
      }
    });
  })
  .delete((req, res) => {
    Food.remove({
      _id: req.params.food_id
    }, (err, food) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "No more Food."});
      }
    });
  });

app.use('/api', router);

app.listen(port);
console.log("magic happens on port" + port);
