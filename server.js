import express from 'express';
import logger from 'morgan';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.get('/', (req, res) => {
  res.send('Hello Invoicer');
});

app.listen(4000);
