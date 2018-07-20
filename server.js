import express from 'express';
import logger from 'morgan';
import user from './routes/user';
import invoice from './routes/invoice';
import order from './routes/order';

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use('/api/v1/users', user);
app.use('/api/v1/invoice', invoice);
app.use('/api/v1/orders', order);


app.get('/', (req, res) => {
  res.send('Hello From Invoicer');
});

app.listen(port);
