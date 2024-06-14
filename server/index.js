const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const songRouter = require('./routes/songs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/songs', songRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
