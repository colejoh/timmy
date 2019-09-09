const express         = require('express');
const bodyParser      = require('body-parser');
const exphbs          = require('express-handlebars');
const blockspring     = require('blockspring');
const fs              = require('fs');
const {google}        = require('googleapis');
const GoogleSpreadsheet = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1GbH7U-0cQXYZAzCg0be5MdQlkYu7XFssJA4zM4gkaYM');

const port = process.env.PORT || 5000;

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

function formatData(data) {
  let formatted = {};
  data.forEach(datam => {
    if (!formatted[datam.page]) formatted[datam.page] = {};
    formatted[datam.page][datam.section] = datam.content;
  })
  return formatted;
}

function getData() {
  return new Promise((resolve, reject) => {
    doc.getInfo(function(err, info) {
      if (err) {
        reject(err)
      }
      sheet = info.worksheets[0];
      sheet.getRows({ offset: 1, limit: 100, orderby: 'col2' }, function( err, rows ){
        const clearRows = rows.map(row => {return {page: row.page, section: row.section, content: row.content}})
        const formattedData = formatData(clearRows);
        resolve(formattedData);
      });
    });
  });
}

app.get('/', function (req, res) {
    const gal = './assets/gallery';

    getData().then((data) => {
      fs.readdir(gal, (err, files) => {
        const json = encodeURIComponent(JSON.stringify(files));

        res.render('home', {
          title: 'Purdue Timmy Global Health',
          images: json,
          mission: data.home.mission,
          goals: data.home.goals,
          tagline_1: data.home.tagline_1,
          tagline_2: data.home.tagline_2
        });
      });
    })
});
app.get('/about', function (req, res) {
  getData().then((data) => {
    res.render('about', {
      title: 'About | Purdue Timmy Global Health',
      main: data.about.main
    });
  })
});
app.get('/what_we_do/fundraising', function (req, res) {
  getData().then((data) => {
    res.render('what_we_do/fundraising', {
      title: 'Fundraising | Purdue Timmy Global Health',
      main: data.fundraising.main
    });
  })
});
app.get('/what_we_do/advocacy', function (req, res) {
  getData().then((data) => {
    res.render('what_we_do/advocacy', {
      title: 'Advocacy | Purdue Timmy Global Health',
      main: data.advocacy.main
    });
  })
});
app.get('/what_we_do/service', function (req, res) {
  getData().then((data) => {
    res.render('what_we_do/service', {
      title: 'Service | Purdue Timmy Global Health',
      main: data.service.main
    });
  })
});
app.get('/team', function (req, res) {
  getData().then((data) => {
    const team = [
      {
        name: data.team.quad_1_name,
        title: data.team.quad_1_role,
        description: '',
        picture: data.team.quad_1_image
      },
      {
        name: data.team.quad_2_name,
        title: data.team.quad_2_role,
        description: '',
        picture: data.team.quad_2_image
      },
      {
        name: data.team.quad_3_name,
        title: data.team.quad_3_role,
        description: '',
        picture: data.team.quad_3_image
      },
      {
        name: data.team.quad_4_name,
        title: data.team.quad_4_role,
        description: '',
        picture: data.team.quad_4_image
      }
    ]

    res.render('team', {
      title: 'Our Team | Purdue Timmy Global Health',
      team: team
    });
  })
});
app.get('/join', function (req, res) {
  res.render('join', {title: 'Get Involved | Purdue Timmy Global Health'});
});
app.get('/timmytimes', function (req, res) {
  const timmytimes = './assets/timmytimes';

  fs.readdir(timmytimes, (err, files) => {
    const json = encodeURIComponent(JSON.stringify(files));
    res.render('timmytimes', {
      title: 'TimmyTimes | Purdue Timmy Global Health',
      timmytimes: files
    });
  });

});
app.use('/assets', express.static('assets'))

app.get('*', function (req, res) {
  res.render('404', {title: '404 | Purdue Timmy Global Health'});
});


var server = app.listen(port);
