import express from 'express';
import logger from 'morgan';

var app = express()
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));
app.get('/', function (req, res) {
  res.send('Hello Invoicer')
})

app.listen(4000)