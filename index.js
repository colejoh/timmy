const express         = require('express');
const bodyParser      = require('body-parser');
const exphbs          = require('express-handlebars');
const port = process.env.PORT || 5000;

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {title: 'Purdue Timmy Global Health'});
});

var server = app.listen(port);
