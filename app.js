// User Information Application 


//PART 0: 

// - Route 1: 
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.set('view engine', 'ejs');


app.get('/', function(req, res){
  fs.readFile('./users.json', function(err, data) {
    if(err) {
      console.log(err);
    }
    let parsedData = JSON.parse(data);
    res.render('index', {parsedData}
      );
  });
});

// PART 1:

// - Route 2: 
app.get('/search', function(req, res){
  res.render('search')
});

//- Route 3: 
app.post('/search', function(req, res) {
  fs.readFile('./users.json', function(err, data) {
    if (err) {
      console.log(err)}

    let parsedData = JSON.parse(data);
    res.render('matches', {data: req.body, users:parsedData});
})
});

// PART 2: 

//- Route 4
app.get('/adduser', function(req, res) {
  res.render('adduser');
});

//- Route 5 

app.post('/adduser', function (req, res) {
  fs.readFile('./users.json', function (err, data) {
    if (err) {throw err}

    const parsedData = JSON.parse(data);
  parsedData.push({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email }); 
    fs.writeFile('users.json', JSON.stringify(parsedData), function(err, data){
      if (err) {throw err}
      console.log('Gathering data was a succes!');
      res.redirect('/');
      });
  });
});

// Server

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



