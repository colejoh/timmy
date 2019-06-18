const express         = require('express');
const bodyParser      = require('body-parser');
const port = process.env.PORT || 5000;

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


var server = app.listen(port);
