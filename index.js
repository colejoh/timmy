const express         = require('express');
const bodyParser      = require('body-parser');
const exphbs          = require('express-handlebars');
const blockspring     = require('blockspring');
const fs = require('fs');

const port = process.env.PORT || 5000;

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    var query = "SELECT *";

    const gal = './assets/gallery';

    fs.readdir(gal, (err, files) => {
      console.log(files);
      const json = encodeURIComponent(JSON.stringify(files));
      console.log(json);

      res.render('home', {
        title: 'Purdue Timmy Global Health',
        images: json
      });
    });
    // blockspring.runParsed("query-google-spreadsheet", {
    //    "query": query,
    //    "url": "https://docs.google.com/spreadsheets/d/1GbH7U-0cQXYZAzCg0be5MdQlkYu7XFssJA4zM4gkaYM"
    //  }, { cache: true, expiry: 7200}, function(res) {
    //    response.json(res.params.data);
    //    // response.addOutput('cards', res.params.data);
    //    // response.end();
    // });

});
app.get('/about', function (req, res) {
    res.render('about', {title: 'About | Purdue Timmy Global Health'});
});
app.get('/what_we_do/fundraising', function (req, res) {
    res.render('what_we_do/fundraising', {title: 'About | Purdue Timmy Global Health'});
});
app.get('/what_we_do/advocacy', function (req, res) {
    res.render('what_we_do/advocacy', {title: 'About | Purdue Timmy Global Health'});
});
app.get('/what_we_do/service', function (req, res) {
    res.render('what_we_do/service', {title: 'About | Purdue Timmy Global Health'});
});
app.get('/team', function (req, res) {
  const team = [
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/300'
    },
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/300'
    },
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/300'
    },
    {
      name: 'Namerson',
      title: 'President',
      description: 'name, year, major, hometown, personal statement, and short description of what role entails (if the director has a committee, mention committee names here)',
      picture: 'https://via.placeholder.com/300'
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
app.use('/assets', express.static('assets'))

app.get('*', function (req, res) {
    res.render('404', {title: '404 | Purdue Timmy Global Health'});
});


var server = app.listen(port);
