---
title: CRM app with Node.js, Replit, and MongoDB
---

# Building a CRM app with Node.js, Replit, and MongoDB

In this tutorial, we'll use Node.js on Replit and a MongoDB database to build a basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) (Create, Read, Update, Delete) [CRM](https://en.wikipedia.org/wiki/Customer_relationship_management) (Customer Relationship Management) application. A CRM lets you store information about customers to help you track the status of every customer relationship. The application will be able to store and edit customer details, as well as keep notes about them.

This tutorial won't be covering the basics of Node.js, but each line of code will be explained in detail.

## Setting up

All the code for our application will be written and hosted on Replit, so you won't need to install any additional software on your computer.

If you don't already have a [Replit](https://replit.com/signup) account, create one now.

Next, head over to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and hit the "Try free" button. You should then sign up, clicking the "Get started free" button to complete the process.

MongoDB Atlas is a fully managed Database-as-a-Service. It provides a document database (often referred to as NoSQL), as opposed to a more traditional relational database like PostgreSQL.

## Creating a cluster

Once you've signed up with MongoDB Atlas, under "Shared Clusters", press the "Create a Cluster" button.

Select a provider and a region. For the purposes of this tutorial, we'll choose "Google Cloud Platform" as the provider and "Iowa (us-central1)" as the region, although it should work regardless of the provider and region.

![Cluster Region](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/mongo-setup.png)

Give your cluster a name. Note that once you've created your cluster, you won't be able to change the name. Click "Create Cluster".

![Cluster Name](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/cluster-name.png)

After a bit of time, your cluster will be created. Once it's available, click on “Database Access” under the Security heading in the left-hand column and then click "Add New Database User". You need a database user to store and retrieve data. Enter a username and password for the user and make a note of those details - you'll need them later. Select “Read and write to any database” as the user privilege. Hit "Add User" to complete this step.

![Adding a New Database User](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/add-db-user.png)

Next, you need to allow network access to the database. Click on "Network Access" in the left-hand column, and “Add IP Address”. Because we won't have a static IP from Replit, we're just going to allow access from anywhere - don't worry, the database is still secured with the username and password you created earlier. In the pop-up, click "Allow Access From Anywhere" and then "Confirm".

![Allow Access From Anywhere](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/whitelist-entry.png)

Now select "Database" under "Deployment" in the left-hand column. Click on "Connect" and select “Connect Your Application”. This will change the pop-up view. Copy the "Connection String" as you will need it shortly to connect to your database from Replit. It will look something like this: `mongodb+srv://<username>:<password>@cluster0-zrtwi.gcp.mongodb.net/test?retryWrites=true&w=majority`

![Retrieve Your Connection String](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/db-connect-string.png)

## Creating a repl and connecting to the database

Now we need a Node.js repl to write the code necessary to connect to our shiny new database. Navigate to Replit and create a new repl, selecting "Node.js" as the language.

A great thing about Replit is that it makes projects public by default. This makes it easy to share and it's great for collaboration and learning, but we have to be careful not to make our database credentials available on the open internet.

To solve this problem, we'll use Replit's `environment variables`, as we have done in previous tutorials. Replit allows us to set secret environment variables through the "Secrets (Environment variables)" menu option.

Open the "Secrets" menu option. There you will be able to set environment variables for your repl. Set the key as the name of your environment variable to `MONGO_USERNAME`. Set the value as your database username, then click "Add new secret". Then create a new key called `MONGO_PASSWORD` with its value set to your database password, and click "Add new secret". It should look something like:

![Set Secrets Key Value](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/replit-secrets.png)

- **Replace** `username` and `password` with your database username and password.

Now that we have credentials set up for the database, we can move on to connecting to it in our code.

MongoDB is kind enough to provide a client that we can use. To test out our database connection, we're going to insert some customer data into our database. In your `index.js` file (created automatically and found under the Files pane), add the following code:

```javascript
const MongoClient = require("mongodb").MongoClient;
const mongo_username = process.env["MONGO_USERNAME"];
const mongo_password = process.env["MONGO_PASSWORD"];

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0-zrtwi.gcp.mongodb.net/crmdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
```

Let's break this down to see what is going on:

- **Line 1** adds the dependency for the MongoDB Client. Replit makes things easy by installing all the dependencies for us, so we don't have to use something like npm to do it manually.
- In **Line 2 & 3**, we retrieve our MongoDB username and password from the environment variables that we set up earlier.
- **Line 5** has a few very important details that we need to get right:
  - Replace the section between the `@` and the next `/` with the same section of your connection string from MongoDB that we copied earlier. You may notice the `${mongo_username}` and `${mongo_password}` before and after the colon near the beginning of the string. These are called template literals. Template literals allow us to put variables in a string, which Node.js will then replace with the actual values of the variables.
  - Note `crmdb` after the `/` and before the `?`. This will be the name of the database that we will be using. MongoDB creates the database for us if it doesn't exist. You can change this to whatever you want to name the database, but remember what you changed it to for future sections of this tutorial.
- **Line 6** creates the client that we will use to connect to the database.

## Making a user interface to insert customer data

We're going to make an HTML form that will capture the customer data and send it to our Replit code, which will then insert it into our database.

In order to actually present and handle an HTML form, we need a way to process HTTP GET and POST requests. The easiest way to do this is to use a web application framework. A web application framework is designed to support the development of web applications - it gives you a standard way to build your application and lets you get to building your application fast without having to do the boilerplate code.

A really simple, fast, and flexible Node.js web application framework is [Express](https://expressjs.com/), which provides a robust set of features for the development of web applications.

The first thing we need to do is add the dependencies we need. Right at the top of your `index.js` file (above the MongoDB code), add the following lines:

```javascript
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let http = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

Let's break this down.

- **Line 1** adds the dependency for Express. Replit will take care of installing it for us.
- **Line 2** creates a new Express app that will handle incoming requests.
- **Line 3** adds a dependency for `'body-parser'`. This is needed for the Express server to be able to handle the data that the form will send, and give it to us in a useful format to use in the code.
- **Line 4** adds a dependency for a basic HTTP server.
- **Line 6 & 7** tell the Express app which parsers to use on incoming data. This is needed to handle form data.

Next, we need to add a way for the Express app to handle an incoming request and give it to us in the form we need. Add the following lines of code below the code you added above:

```javascript
app.get("/", function (req, res) {
  res.sendFile("/index.html", { root: "." });
});

app.get("/create", function (req, res) {
  res.sendFile("/create.html", { root: "." });
});
```

- `app.get` tells Express that we want it to handle a GET request.
- `'/'` tells Express that it should respond to GET requests sent to the root URL. A root URL looks something like `https://crm.hawkiesza.repl.co` - note that there are no slashes after the URL.
- `'/create'` tells Express that it should respond to GET requests sent to the `/create` endpoint after the root URL, i.e. `https://crm.hawkiesza.repl.co/create`.
- `res.sendFile` tells Express to send the given file as a response.

Before the server will start receiving requests and sending responses, we need to tell it to run. Add the following code below the previous line:

```javascript
app.set("port", process.env.PORT || 5000);
http.listen(app.get("port"), function () {
  console.log("listening on port", app.get("port"));
});
```

- **Line 1** tells Express to set the port number to either a number defined as an environment variable, or 5000 if no definition was made.
- **Line 2-4** tells the server to start listening for requests.

Now we have an Express server listening for requests, but we haven't yet built the form that it needs to send back if it receives a request.

Make a new file called `index.html` and paste the following code into it:

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <form action="/create" method="GET">
      <input type="submit" value="Create" />
    </form>
  </body>
</html>
```

This is a straightforward bit of HTML that puts a single button on the page. When this button is clicked, it sends a GET request to `/create`, which the server will then respond to according to the code that we wrote above - in our case, it will send back the `create.html` file which we will define now.

Make a new file called `create.html` and paste the following into it:

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <h2>Customer details</h2>

    <form action="/create" method="POST">
      <label for="name">Customer name *</label><br />
      <input
        type="text"
        id="name"
        name="name"
        class="textInput"
        placeholder="John Smith"
        required
      />
      <br />
      <label for="address">Customer address *</label><br />
      <input
        type="text"
        name="address"
        class="textInput"
        placeholder="42 Wallaby Way, Sydney"
        required
      />
      <br />
      <label for="telephone">Customer telephone *</label><br />
      <input
        type="text"
        name="telephone"
        class="textInput"
        placeholder="+275554202"
        required
      />
      <br />
      <label for="note">Customer note</label><br />
      <input
        type="text"
        name="note"
        class="textInput"
        placeholder="Needs a new pair of shoes"
      />
      <br /><br />
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

We won't go in-depth into the above HTML. It is a very basic form with four fields (name, address, telephone, note) and a submit button, which creates an interface that will look like the one below.

![Customer Details](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/customer-details.png)

When the user presses the submit button, a POST request is made to `/create` with the data in the form - we still have to handle this request in our code as we're currently only handling a GET request to `/`.

If you click the "Run" button now, a new window should appear on the right that displays the "Create" button we defined just now in `index.html`. To see the form, you can also navigate to `https://<repl_name>.<your_username>.repl.co`, replacing <repl_name> with whatever you named your repl (but with no underscores or spaces) and <your_username> with your repl username. You will be able to see this URL in the repl itself.

![Run Your Application](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/first-run.png)

If you select "Create" and then fill in the form and hit submit, you'll get a response that says `Cannot POST /create`. This is because we haven't added the code that handles the form POST request, so let's do that.

![*Cannot POST/create*](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/cannot-post.png)

Add the following code into your `index.js` file, below the `app.get` entry that we made above:

```javascript
app.post("/create", function (req, res, next) {
  client.connect((err) => {
    const customers = client.db("crmdb").collection("customers");

    let customer = {
      name: req.body.name,
      address: req.body.address,
      telephone: req.body.telephone,
      note: req.body.note,
    };
    customers.insertOne(customer, function (err, res) {
      if (err) throw err;
      console.log("1 customer inserted");
    });
  });
  res.send("Customer created");
});
```

- **Line 1** defines a new route that listens for an HTTP POST request at `/create`.
- **Line 2** connects to the database. This happens asynchronously, so we define a callback function that will be called once the connection is made.
- **Line 3** creates a new collection of customers. Collections in MongoDB are similar to tables in SQL.
- **Line 5** defines customer data that will be inserted into the collection. This is taken from the incoming request. The form data is parsed using the parsers that we defined earlier and is then placed in the `req.body` variable for us to use in the code.
- **Line 6** inserts the customer data into the collection. This also happens asynchronously, and so we define another callback function that will get an error if an error occurred, or the response if everything happened successfully.
- **Line 7** throws an error if the above insert had a problem.
- **Line 8** gives us some feedback that the insert happened successfully.

If you run the repl now (you may need to refresh it) and submit the filled-in form, you'll get a message back that says "Customer created". If you look in your cluster in MongoDB and select the "Collections" button, you'll see a document has been created with the details that we submitted in the form.

![Customer Created](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/customer-created.png)

## Updating and deleting database entries

As a final step in this tutorial, we want to be able to update and delete database documents in our collection. To make things simpler, we're going to make a new HTML page where we can request a document and then update or delete it.

First, let's make the routes to our new page. In your `index.js`, add the following code below the rest of your routing code (i.e. before the MongoDB code):

```javascript
app.get("/get", function (req, res) {
  res.sendFile("/get.html", { root: "." });
});

app.get("/get-client", function (req, res) {
  client.connect((err) => {
    client
      .db("crmdb")
      .collection("customers")
      .findOne({ name: req.query.name }, function (err, result) {
        if (err) throw err;
        res.render("update", {
          oldname: result.name,
          oldaddress: result.address,
          oldtelephone: result.telephone,
          oldnote: result.note,
          name: result.name,
          address: result.address,
          telephone: result.telephone,
          note: result.note,
        });
      });
  });
});
```

- **Line 1-3** tells Express to respond to incoming GET requests on `/get` by sending the `get.html` file which we will define below.
- **Line 5-12** tells Express to respond to incoming GET requests on `/get-client`.
  - **Line 7** makes a call to the database to fetch a customer by name. If there is more than one customer with the same name, then the first one found will be returned.
  - **Line 9** tells Express to render the `update` template, replacing variables with the given values as it goes. Important to note here is that we are also replacing values in the hidden form fields we created earlier with the current values of the customer details. This is to ensure that we update or delete the correct customer.

In your `index.html` file, add the following code after the `</form>` tag:

```html
<br />
<form action="/get" method="GET">
  <input type="submit" value="Update/Delete" />
</form>
```

This adds a new button that will make a GET request to `/get`, which will then return `get.html`.

![Index](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/buttons.png)

Make a new file called `get.html` with the following contents:

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <form action="/get-client" method="GET">
      <label for="name">Customer name *</label><br />
      <input
        type="text"
        id="name"
        name="name"
        class="textInput"
        placeholder="John Smith"
        required
      />
      <input type="submit" value="Get customer" />
    </form>
  </body>
</html>
```

This makes a simple form with an input for the customer's name and a button.

![Get Customer](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/get-customer.png)

Clicking this button will make a GET request to `/get-client`, which will respond with the client details, and we will be able to update or delete them.

To see the customer details on a form after requesting them, we need a templating engine to render them onto the HTML page and send the rendered page back to us. With a templating engine, you define a template - a page with variables in it - and then give it the values you want to fill into the variables. In our case, we're going to request the customer details from the database and tell the templating engine to render them onto the page.

We're going to use a templating engine called [Pug](https://pugjs.org/api/getting-started.html). Pug is a simple templating engine that integrates fully with Express. The syntax that Pug uses is very similar to HTML. One important difference in the syntax is that spacing is very important as it determines your parent/child hierarchy.

First, we need to tell Express which templating engine to use and where to find our templates. Put the following line above your route definitions (i.e. after the other `app.use` lines in `index.js`):

```javascript
app.engine("pug", require("pug").__express);
app.set("views", ".");
app.set("view engine", "pug");
```

Now create a new file called `update.pug` with the following content:

```html
html body p #{message} h2= 'Customer details' form(method='POST'
action='/update') input(type='hidden' id='oldname' name='oldname' value=oldname)
input(type='hidden' id='oldaddress' name='oldaddress' value=oldaddress)
input(type='hidden' id='oldtelephone' name='oldtelephone' value=oldtelephone)
input(type='hidden' id='oldnote' name='oldnote' value=oldnote) label(for='name')
Customer name: br input(type='text', placeholder='John Smith' name='name'
value=name) br label(for='address') Customer address: br input(type='text',
placeholder='42 Wallaby Way, Sydney' name='address' value=address) br
label(for='telephone') Customer telephone: br input(type='text',
placeholder='+275554202' name='telephone' value=telephone) br label(for='note')
Customer note: br input(type='text', placeholder='Likes unicorns' name='note'
value=note) br button(type='submit' formaction="/update") Update
button(type='submit' formaction="/delete") Delete
```

This is very similar to the HTML form we created previously for `create.html`, however this is written in the Pug templating language. We're creating a hidden element to store the "old" name, telephone, address, and note of the customer - this is for when we want to do an update.

Using the old details to update the customer is an easy solution, but not the best solution as it makes the query cumbersome and slow. If you add extra fields into your database, you would have to remember to update your query as well, otherwise it could lead to updating or deleting the wrong customer if they have the same information. A better but more complicated way is to use the unique ID of the database document, as that will only ever refer to one customer.

We have also put in placeholder variables for name, address, telephone, and note, and we have given the form two buttons with different actions.

If you now run the code, you will have an index page with two buttons. Pressing the "Update/Delete" button will take you to a new page that asks for a customer name. If you fill in the customer name and press "Get customer", a page will load with the customer's details and two buttons below, "Update" and "Delete". Make sure you enter a customer name you have entered before.

![Update-Delete](https://replit-docs-images.bardia.repl.co/images/tutorials/crm-app-mongodb-nodejs/customer-details-final.png)

Our next step is to add the "Update" and "Delete" functionality. Add the following code below your routes in `index.js`:

```javascript
app.post("/update", function (req, res) {
  client.connect((err) => {
    if (err) throw err;
    let query = {
      name: req.body.oldname,
      address: req.body.oldaddress,
      telephone: req.body.oldtelephone,
      note: req.body.oldnote,
    };
    let newvalues = {
      $set: {
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
        note: req.body.note,
      },
    };
    client
      .db("crmdb")
      .collection("customers")
      .updateOne(query, newvalues, function (err, result) {
        if (err) throw err;
        console.log("1 document updated");
        res.render("update", {
          message: "Customer updated!",
          oldname: req.body.name,
          oldaddress: req.body.address,
          oldtelephone: req.body.telephone,
          oldnote: req.body.note,
          name: req.body.name,
          address: req.body.address,
          telephone: req.body.telephone,
          note: req.body.note,
        });
      });
  });
});

app.post("/delete", function (req, res) {
  client.connect((err) => {
    if (err) throw err;
    let query = {
      name: req.body.name,
      address: req.body.address ? req.body.address : null,
      telephone: req.body.telephone ? req.body.telephone : null,
      note: req.body.note ? req.body.note : null,
    };
    client
      .db("crmdb")
      .collection("customers")
      .deleteOne(query, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.send(`Customer ${req.body.name} deleted`);
      });
  });
});
```

This introduces two new POST handlers - one for `/update`, and one for `/delete`.

- **Line 2** connects to our MongoDB database.
- **Line 3** throws an error if there was a problem connecting to the database.
- **Line 4** defines a query that we will use to find the document to update. In this case, we'll use the details of the customer _before_ it was updated. We saved this name earlier in a hidden field in the HTML. Trying to find the customer by its updated name obviously won't work, because it hasn't been updated yet. Also, note that we are setting some of the fields to null if they are empty. This is so that the database returns the correct document when we update or delete - if we search for a document that has no address with an address of '' (empty string), then our query won't return anything.
- **Line 5** defines the new values that we want to update our customer with.
- **Line 6** updates the customer with the new values using the query.
- **Line 7** throws an error if there was a problem with the update.
- **Line 8** logs that a document was updated.
- **Line 9** re-renders the update page with a message saying that the customer was updated, and displays the new values.
- **Line 15** connects to our MongoDB database.
- **Line 16** throws an error if there was a problem connecting to the database.
- **Line 17** defines a query that we will use to find the document to delete. In this case, we use all the details of the customer _before_ any changes were made on the form to make sure we delete the correct customer.
- In **Line 18**, we connect to the database and delete the customer.
- **Line 19** throws an error if there was a problem with the delete.
- **Line 20** logs that a document was deleted.
- **Line 21** sends a response to say that the customer was deleted.

## Putting it all together

If you run your application now, you'll be able to create, update, and delete documents in a MongoDB database. This is a very basic CRUD application, with a very basic and unstyled UI, but it should give you the foundation to build much more sophisticated applications.

Some ideas for this are:

- You could add fields to the database to classify customers according to which stage they are in your sales [pipeline](https://www.bitrix24.com/glossary/what-is-pipeline-management-definition-crm.php) so that you can track if a customer is potentially stuck somewhere and contact them to re-engage.
- You could integrate some basic marketing automation with a page allowing you to send an email or SMS to customers (though don't spam clients!).
- You could also add fields to keep track of customer purchasing information so that you can see which products do well with which customers.

If you want to start from where this tutorial leaves off, fork the repl at [https://replit.com/@ritza/replcrm](https://replit.com/@ritza/replcrm). To get additional guidance, reach out to the [Replit community](https://ask.replit.com) for assistance.

<iframe height="400px" width="100%" src="https://replit.com/@ritza/replcrm?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
