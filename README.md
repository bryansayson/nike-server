# nike-server

# Installation
1. git clone `https://github.com/brysayson/nike-server` clone repo into desired directory
2. `cd nike-server`
3. `npm i` to install required modules
4. `node server.js` to restart server
5. you should have received a notification saying server is active at localhost:3000

# API
For Password Protected endpoints (`/updateContact` and `/addContact`) be sure to select `Basic Auth` under the `Authorization`
options in your chosen http tester (I use and recommend postman) with credentials:
```
  username: user
  password: pass
```

Fields are case sensitive.

# GET endpoints

  ## Contacts - this endpoint will supply all the contacts in storage.
  ### `/contacts`

  Example Usage:

  ```
  GET http://localhost:3000/contacts

  will return:

  [
    {
      "firstName": "nicole",
      "lastName": "sayson",
      "email": "nicole@yahoo.com",
      "number": "12345678",
      "address": "Elm Street"
    },
    {
      "firstName": "nicole",
      "lastName": "sayson",
      "email": "nicole@yahoo.com",
      "number": "12345678",
      "address": "Elm Street"
    }
  ]

  ```

  ## Get a Specific Contact - this endpoint will match the supplied parameters with any and every contact containing    matching contact details.
  ### `/getContact`
  
  Example Usage:
  
  ```
  To get all the contacts where lastName === sayson:

  GET http://localhost:3000/getContact?lastName=sayson

  returns:

  [
    {
      "firstName": "bryan",
      "lastName": "sayson",
      "email": "bryansayson@yahoo.com",
      "number": "12345678",
      "address": "nightmate on Elm Street"
    },
    {
      "firstName": "brent",
      "lastName": "sayson",
      "email": "brentsayson@yahoo.com",
      "number": "23456789",
      "address": "nightmare on Elm Street"
    }
  ]

  you can add as many parameters as you deem necessary to achieve the desired results.

  ```

# POST endpoints (password protected)
  
  ## Add a Contact - add a specific contact by supplying `JSON` `raw` data inside the `request` body
  ### `/addContact`

  Sample Usage:

  
  NOTE: be sure to `Content-Type` `application/json` under the headers in your request, or else your `JSON` formatted body
  will not be recognized.

  ```
  POST http://localhost:3000/addContact

  request body:

  {
   "firstName": "bryan",
   "lastName": "sayson",
   "email": "bryansayson@yahoo.com",
   "number": "12345678",
   "address": "nightmate on Elm Street"
  }
  ```

  ## Update a Contact - endpoint will search for the corresponding contact, based on the parameters you supply, and update the fields provided in the `JSON` formatted data inside the body of the request. 
### `/updateContact`

  ### Sample Usage:

  ```
  If you want to update a contact where firstName === bryan and lastName === sayson:

  POST http://localhost:3000/updateContact?firstName=bryan&lastName=sayson

  with the information you want to be updated, in the body of the request:

  for example if you want to change the email:

  {
   "email": "somethingsomething@yahoo.com"
  }
  ```
  
  # To Do List

  1. Integrate Passport auth with a couple strategies (facebook, google)
  2. Handle deleting contacts
  3. Handle and prevent duplicate contacts
  4. Provide unique IDs to entrys, persist to MongoDB
  
  
  
                                                                  
