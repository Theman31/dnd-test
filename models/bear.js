var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: String,
  foods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}]
})

module.exports = mongoose.model('Bear', BearSchema);
