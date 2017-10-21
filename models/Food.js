var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Food', FoodSchema);
