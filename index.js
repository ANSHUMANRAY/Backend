/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000'],
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
