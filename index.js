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
app.get('/about', function (req, res) {
    res.render('about', {title: 'About | Purdue Timmy Global Health'});
});
app.get('/team', function (req, res) {
  const team = [
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/200'
    },
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/200'
    },
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/200'
    },
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/200'
    }
  ]
    res.render('team', {title: 'Our Team | Purdue Timmy Global Health', team: team});
});
app.get('/join', function (req, res) {
    res.render('join', {title: 'Get Involved | Purdue Timmy Global Health'});
});
app.get('/timmytimes', function (req, res) {
    res.render('timmytimes', {title: 'TimmyTimes | Purdue Timmy Global Health'});
});
app.get('*', function (req, res) {
    res.render('404', {title: '404 | Purdue Timmy Global Health'});
});


var server = app.listen(port);
