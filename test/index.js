import express from 'express';
let app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
mongoose.Promise = bluebird;

const port = process.env.PORT || 8080;

import '../lib/server.js';

describe('Crud Bears mongo', () => {
  it('should return 200', done => {
    app.listen(port, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
