const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
require('./config/db').connect();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.js')


app.use(cors())
app.use(
  express.json({
      limit: '1024mb',
  }),
)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', routes)



app.listen(port , (req,res) => {
    console.log(`Server Start on http://localhost:${port}`)
})