var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require('http-auth');
var contacts = [];

// auth helper function
var basic = auth.basic({
      realm: "Web."
  }, function (username, password, callback) { // Custom authentication method.
      callback(username === "user" && password === "pass");
  }
);

app.listen(3000, function () {
  console.log('Server is up on on port 3000!');
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/contacts', function (req, res){
  res.send(contacts);
});

app.get('/getContact', function (req, res){
  var query = req.query;
  var searchResult = contactSearcher(query);
  res.send(searchResult);
});

app.post('/addContact', auth.connect(basic), function (req, res) {
  var newContact = req.body;
  contacts.push(newContact);
  res.send("Added Contact!");
});

app.post('/updateContact', auth.connect(basic), function (req, res){
  var query = req.query;
  var data = req.body;
  var user = req.user;
  var searchResult = contactSearcher(query);
  searchResult.forEach(function(contact) {
    var index = contacts.indexOf(contact);
    contactUpdater(index, data, user);
  })
  res.send("Updated Contact Details!");
});

// utility function to update contact records
var contactUpdater = function(index, details, updater) {
  var contactToUpdate = contacts[index];
  for (var key in details) {
    contactToUpdate[key] = details[key];
  }
  // log user who updated and time updated
  contactToUpdate.updateInfo = {
    updatedBy: updater,
    updateTime: new Date().toLocaleString()
  }
}

//utility function to search for a specific contact
var contactSearcher = function(query) {
  var result = [];
  contacts.forEach(function(contact){
    var match = true;
    for (var key in query) {
      if (query[key] !== contact[key]) {
        match = false;
      }
    }
    if (match) {
      result.push(contact);
    }
  });
  return result;
};
