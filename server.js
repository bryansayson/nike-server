var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var auth = require('http-auth');

// auth helper function
var basic = auth.basic({
        realm: "Web."
    }, function (username, password, callback) { // Custom authentication method.
        callback(username === "user" && password === "pass");
    }
);

// data storage
var contacts = [];

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/addContact', auth.connect(basic), function (req, res) {
  var newContact = req.body
  contacts.push(newContact)
  res.send("Added Contact!")
})

app.get('/contacts', function (req, res){
  res.send(contacts)
})

app.get('/getContact', function (req, res){
  var query = req.query;
  // function to search contacts
  var searchResult = contactSearcher(query);
  console.log(searchResult);
  res.send(searchResult);
})

app.post('/updateContact', auth.connect(basic), function (req, res){
  var query = req.query;
  var data = req.body;
  var searchResult = contactSearcher(query);
  var i = contacts.indexOf(searchResult);
  contactUpdater(i, data);
  res.send("Updated Contact Details!");
})

var contactUpdater = function(index, details) {
  var contactToUpdate = contacts[index];
  for (var key in details) {
    contactToUpdate[key] = details[key];
  }
}

var contactSearcher = function(query) {
  var result;
  contacts.forEach(function(contact){
    var match = true;
    for (var key in query) {
      if (query[key] !== contact[key]) {
        match = false;
      }
    }
    if (match) {
      result = contact;
    }
  })
  return result;
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
