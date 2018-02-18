var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var mocha  = require('mocha');
var assert = require('chai').assert;
const port = process.env.PORT || 8080;

const server = './server.js';

describe('Crud Bears mongo', function () {
  it('should return 200', function (done) {
    app.listen(port, function () {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
