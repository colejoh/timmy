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

/*
  This function just makes a nested object where the page is the parent and
  then the section data is pages;
*/
function formatData(data) {
  let formatted = {};
  data.forEach(datam => {
    if (!formatted[datam.page]) formatted[datam.page] = {};
    formatted[datam.page][datam.section] = datam.content;
  })
  return formatted;
}

function getData(type) {
  return new Promise((resolve, reject) => {
    doc.getInfo(function(err, info) {
      if (err) {
        reject(err)
      }
      sheet = info.worksheets[0];
      sheet.getRows({ offset: 1, limit: 100, orderby: 'col2' }, function( err, rows ){
        let clearRows;
        if (type === 'team') {
          clearRows = rows.filter(row => {return row.page === 'team'});
          clearRows = rows.map(row => {return {name: row.name, section: row.section, content: row.content, role: row.role, image: row.image}});
          resolve(clearRows);
        } else {
          clearRows = rows.map(row => {return {page: row.page, section: row.section, content: row.content}});
          const formattedData = formatData(clearRows);
          resolve(formattedData);
        }
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
          tagline_2: data.home.tagline_2,
          announcement: data.home.announcement
        });
      });
    })
});
app.get('/about', function (req, res) {
  const gal = './assets/about';

  getData().then((data) => {
    fs.readdir(gal, (err, files) => {
      const json = encodeURIComponent(JSON.stringify(files));
      res.render('about', {
        title: 'About | Purdue Timmy Global Health',
        main: data.about.main,
        images: json
      });
    });
  });
});
app.get('/what_we_do/fundraising', function (req, res) {
  const gal = './assets/fundraising';

  getData().then((data) => {
    fs.readdir(gal, (err, files) => {
      const json = encodeURIComponent(JSON.stringify(files));
      res.render('what_we_do/fundraising', {
        title: 'Fundraising | Purdue Timmy Global Health',
        main: data.fundraising.main,
        images: json
      });
    });
  })
});
app.get('/what_we_do/advocacy', function (req, res) {
  const gal = './assets/advocacy';

  getData().then((data) => {
    fs.readdir(gal, (err, files) => {
      const json = encodeURIComponent(JSON.stringify(files));
      res.render('what_we_do/advocacy', {
        title: 'Advocacy | Purdue Timmy Global Health',
        main: data.advocacy.main,
        images: json,
      });
    });
  })
});
app.get('/what_we_do/service', function (req, res) {
  const gal = './assets/service';

  getData().then((data) => {
    fs.readdir(gal, (err, files) => {
      const json = encodeURIComponent(JSON.stringify(files));
      res.render('what_we_do/service', {
        title: 'Service | Purdue Timmy Global Health',
        main: data.service.main,
        images: json
      });
    });
  })
});

const getTeamSection = (team, section) => {
  return team.filter(member => { return member.section.includes(section)})
}

app.get('/team', function (req, res) {
  getData('team').then((data) => {
    const team = {
      quad: getTeamSection(data, 'quad'),
      finance: getTeamSection(data, 'finance'),
      advocacy: getTeamSection(data, 'advocacy'),
      service: getTeamSection(data, 'service'),
    };

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
