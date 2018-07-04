import express from 'express';
import logger from 'morgan';
import user from './routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use('/api/v1/users', user);


app.get('/', (req, res) => {
  res.send('Hello Invoicer');
});

app.listen(4000);
