import express from 'express';
let app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
mongoose.Promise = bluebird;

import Bear from '../models/bear';

 app.use(bodyParser.urlencoded({ extended : true }));
 app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

mongoose.connect('mongodb://localhost/bears');

 router.use((res, req, next) => {
   console.log("something is happening");
   next();
 })

router.get('/', (req, res) => {
   res.json({ message: "Hello, welcome to our api!"})
})

 router.route('/bears')

   .post((req, res) => {
     let bear = new Bear();
     bear.name = req.body.name;
     bear.alias = req.body.alias;

     bear.save((err) => {
         if(err)
           res.send(err);
         res.json({ message: "Bear Created!" })
       })
     })

   .get((req, res) => {
     Bear.find((err, bears) => {
       if(err)
         res.send(err)
       res.json(bears)
     })
   })

 router.route('/bears/:bear_id')

   .get((req, res) => {
     Bear.findById(req.params.bear_id, (err, bear) => {
       if(err)
         res.send(err);
       res.json(bear)
     });
   })

   .put((req,res) => {
     Bear.findById(req.params.bear_id, (err, bear) => {
       if(err)
         res.send(err);
       bear.name = req.body.name;
       bear.alias = req.body.alias;
       bear.save((err) => {
         if(err)
           res.send(err);
         res.json({ message: "Bear Saved!" })
       })
     })
   })

   .delete((req, res) => {
     Bear.remove({
       _id: req.params.bear_id
     }, (err, bear) => {
       if(err)
         res.send(err);
         res.json({ message: "Now is dead bear."});
     });
   });

 app.use('/api', router);

 app.listen(port);
 console.log("magic happens on port" + port);
