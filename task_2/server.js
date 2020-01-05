const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

user = {
   db: [],
   counter: 0,
   add: function(user) {
        console.log('user: ', user);
        this.db.push(user);
    },
    
    remove: function(searchId) {
        removable = this.find(searchId);
        if (removable) {
            removable.isDeleted = true;
        } else {
            console.log(`This id: ${searchId} isn't exist`);
        }
    },    
    user: function(login, password, age) {
      this.login = login;
      this.password = password;
      this.age = age;
      this.isDeleted = false;  
    },
    
    create: function(login, password, age){
        thisUser = new this.user(login, password, age);
        thisUser.id = this.counter++;

        this.add(thisUser)
    },
    
    find: function(searchId){
      result = this.db.find( ({ id }) => id === searchId );
      return result;
    }
}

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   console.log("Cookies: ", req.cookies);
   res.send('Hello GET');
});

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name: req.query.first_name,
      last_name: req.query.last_name
   };
   console.log(req.query); 
   res.end(JSON.stringify(response));
});

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
});

app.post('/process_post', urlencodedParser, function (req, res) {
      // Prepare output in JSON format
   response = {
      login: req.body.loginName,
      password: req.body.password,
      age: req.body.age
   };
   user.create(JSON.stringify(response));
   res.send(JSON.stringify(response));
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
});

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/user/:id', function(req, res) {   
   let employee = req.body;
   if (employee === undefined) {
      res.status(404)
      .json({message: `Employee with id ${req.params.id} not found`});
   } else {
      res.json(employee);
   }
   //res.send('Page Pattern Match');
});

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
