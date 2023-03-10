/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const cmsRouter = require('./src/routes/cms');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.use('/', cmsRouter);

app.post('/test', (req, res) => {
  console.log(req.body);

  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
