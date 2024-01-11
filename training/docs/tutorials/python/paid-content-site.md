---
title: Paid content site with replit.web & Stripe
---

# Build a paid content site with `replit.web` and Stripe

In this tutorial, we'll combine `replit.web` and Stripe to build a digital content storefront. Anyone with a Replit account will be able to log into our website and purchase premium PDFs. Our site will also keep track of what each user has purchased, so they can build up a library.

By the end of this tutorial, you'll be able to:

- Build a dynamic web application with `replit.web`.
- Use [Stripe](https://stripe.com/) to sell digital content.

![Paid content site functionality](https://docimg.replit.com/images/tutorials/29-paid-content-site/site-functionality.gif)

## Getting started

To get started, create a Python repl.

![Create python repl](https://docimg.replit.com/images/tutorials/29-paid-content-site/create-python-repl.png)

Our application will have the following functionality:

- Users can log in with their Replit accounts.
- Users can purchase PDFs.
- Users can view free PDFs and PDFs that they've previously purchased.
- Administrators can upload new PDFs.

We've covered both `replit.web` and Stripe in previous tutorials, so some aspects of the following may be familiar if you've built [a brick shop](/tutorials/nodejs/online-store-checkout-process).

We'll start our app off with the following import statements in `main.py`:

```python
import os, shutil
import stripe
from flask import Flask, render_template, render_template_string, flash, redirect, url_for, request, jsonify
from flask.helpers import send_from_directory
from werkzeug.utils import secure_filename
from replit import db, web
from functools import wraps
```

Here we're importing most of what we'll need for our application:

1. Python's `os` and `shutil` packages, which provide useful functions for working with files and directories.
2. Stripe's Python library.
3. Flask, our web framework and the heart of the application.
4. A Flask helper function `send_from_directory`, which will allow us to send PDFs to users.
5. A function `secure_filename` from the Werkzeug WSGI (which Flask is built on) that we'll use when admins upload PDFs and other files.
6. Replit's web framework and Replit DB integration, which we'll use for user authentication and persistent data storage.
7. The `wraps` tool from Python's `functools`, which we'll use to make authorization decorators for restricting access to sensitive application functionality.

Now that the imports are out of the way, let's start on our application scaffold. Add the following code to `main.py`:

```python
app = Flask(__name__,
            static_folder='static',
            static_url_path='')
```

This code initializes our Flask application. We've added a `static_folder` and `static_url_path` so that we can serve static files directly from our repl's file pane without writing routing code for each file. This will be useful for things like images and stylesheets.

Add the following code to initialize your application's secret key:

```python
# Secret key
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
```

Our secret key will be a long, random string. You can generate one in your repl's Python console with the following two lines of code:

```python
import random, string
''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
```

![Random string](https://docimg.replit.com/images/tutorials/29-paid-content-site/randomstring.png)

Rather than putting this value directly into our code, we'll retrieve it from an [environment variable](https://en.wikipedia.org/wiki/Environment_variable). This will keep it out of source control and is good practice for sensitive data.

In your repl's Secrets tab, add a new key named `SECRET_KEY` and enter the random string you just generated as its value.

![Repl secrets](https://docimg.replit.com/images/tutorials/29-paid-content-site/repl-secrets.png)

Once that's done, return to `main.py` and add the code below to initialize our Replit database:

```python
# Database setup
def db_init():
    if "content" not in db.keys():
        db["content"] = {}

    if "orders" not in db.keys():
        db["orders"] = {}

    # Create directories
    if not os.path.exists("static"):
        os.mkdir("static")

    if not os.path.exists("content"):
        os.mkdir("content")

db_init()
```

[Replit's Database](/hosting/databases/replit-database) can be thought of and used as one big Python dictionary that we can access with `db`. Any values we store in `db` will persist between repl restarts.

We've written a function to initialize the database as we may want to do it again if we need to refresh our data during testing. Whenever we initialize our database, we will also create the `content` and `static` directories, which will contain user-uploaded files.

Next we need to create our [UserStore](https://replit-py.readthedocs.io/en/latest/api.html) (a secondary database keyed by username), and list of admins:

```python
users = web.UserStore()

ADMINS = ["YOUR-REPLIT-USERNAME-HERE"]
```

Make sure to replace the contents of the `ADMINS` list with your Replit username.

Finally, let's make our root page. Add the following code, and then run your repl.

```python
# Main app
@app.route("/")
@web.authenticated
def index():
    return f"Hello {web.auth.name}"

web.run(app)
```

Because we've added the `@web.authenticated` [function decorator](https://realpython.com/primer-on-python-decorators/) to our index page, it will only be available to logged-in users. You should see this now, as your app will show a login button. Click on that button, and authorize your application to use Replit authentication in the window that pops up.

![Login button](https://docimg.replit.com/images/tutorials/29-paid-content-site/login-button.png)

Having done that, you should now see the greeting we implemented above. If you send your repl to a friend, they will also be able to log in and see their Replit username on the greeting message.

## Content upload and other admin functionality

Before we do anything else with our site, we need to have some PDFs to sell. While we could manually upload our PDFs to our repl and write code to add each one to the database, it will make our site more user-friendly if we include an upload form for this purpose.

This upload form should only be accessible by admins, so we can enforce some level of quality control. We'll also create a route that allows admins to refresh the application database.

### Access control

Add the following functions to `main.py`, just below the line where you've assigned `ADMINS`:

```python
# Helper functions
def is_admin(username):
    return username in ADMINS

# Auth decorators
def admin_only(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if not is_admin(web.auth.name):
            flash("Permission denied.", "warning")
            return redirect(url_for("index"))

        return f(*args, **kwargs)

    return decorated_function
```

The code in the second function may look a bit strange if you haven't written your own decorators before. Here's how it works: `admin_only` is the name of our decorator. You can think of decorators as functions that take other functions as arguments. (The two code snippets below are for illustration and not part of our program.) Therefore, if we write the following:

```python
@admin_only
def admin_function():
    return f"Hello admin"

admin_function()
```

it will be roughly equivalent to:

```python
def admin_function():
    return f"Hello admin"

admin_only(admin_function)
```

So whenever `admin_function` gets called, the code we've defined in `decorated_function` will execute before anything we define in `admin_function`. This means we don't have to include an `if not is_admin` check in every piece of admin functionality. As per the code, if a non-admin attempts to access restricted functionality, our app will [flash](https://flask.palletsprojects.com/en/2.0.x/patterns/flashing/) a warning message and redirect them to the home page.

Now we can create the following admin routes below the definition of the `index` function:

```python
# Admin functionality
@app.route('/admin/content-create', methods=["GET", "POST"])
@web.authenticated
@admin_only
def content_create():
    pass

@app.route('/admin/db-flush')
@web.authenticated
@admin_only
def flush_db():
    pass
```

Note that both of these functions are protected with the `@web.authenticated` and `@admin_only` decorators, restricting their use to logged-in admins.

The first function will let our admins create content, and the second will allow us to flush the database. While the second function will be useful during development, it's not something we'd want to use in a finished application, as our database will contain records of user payments.

### Content creation form

Before we can fill in the code for content creation, we need to create the web form our admins will use. As the form creation code will include a lot of information and functionality and require several special imports, we're going to put it in its own file so we can keep a navigable codebase. In your repl's files pane, create `forms.py`.

![Create forms.py file](https://docimg.replit.com/images/tutorials/29-paid-content-site/forms-py-in-file-pane.png)

Enter the following `import` statements at the top of `forms.py`:

```python
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField, FloatField, ValidationError
from wtforms.validators import InputRequired, NumberRange, Length
from replit import db
```

Here we're importing from [WTForms](https://wtforms.readthedocs.io/en/2.3.x/), an extensive library for building web forms, and [Flask WTF](https://flask-wtf.readthedocs.io/en/0.15.x/), a library which bridges WTForms and Flask. We're also importing our Replit database, which we'll need for uniqueness validations.

The structure of our forms is dictated by the structure of our database. In our `db_init` function, we defined two dictionaries, "content" and "orders". The former will contain entries for each of the PDFs we have for sale. These entries will contain the PDF's filename as well as general metadata. Thus, our "content" data structure will look something like this:

```json
{
  "content": {
    "ID": {
      "name": "NAME",
      "description": "DESCRIPTION",
      "file": "PDF_FILENAME",
      "preview_image": "IMAGE_FILENAME",
      "price": 5
    }
  }
}
```

The ID value will be the content's name, all-lowercase, with spaces replaced by hyphens, so we can use it in our app's URLs. Let's create a function that turns names into IDs, in `forms.py`, just below our imports:

```python
def name_to_id(name):
    return name.lower().replace(" ", "-")
```

Now we can create our form. With Flask WTF, we model a form as a class inheriting from FlaskForm. This class takes in the value of Flask's `request.form` and applies validations to the fields therein. Add the following class definition to the bottom of `forms.py`:

```python
class ContentCreateForm(FlaskForm):
    name = StringField(
        "Title",
        validators=[
            InputRequired(),
            Length(3)
            ]
    )

    description = TextAreaField(
        "Description",
        validators=[InputRequired()]
    )

    file = FileField(
        "PDF file",
        validators=[
            FileRequired(),
            FileAllowed(['pdf'], "PDFs only.")
        ]
    )

    image = FileField(
        "Preview image",
        validators=[
            FileRequired(),
            FileAllowed(['jpg', 'jpeg', 'png', 'svg'], "Images only.")
        ]
    )

    price = FloatField(
        "Price in USD (0 = free)",
        validators=[
            InputRequired(),
            NumberRange(0)
        ]
    )

    submit = SubmitField("Create content")

    def validate_name(form, field):
        if name_to_id(field.data) in db["content"].keys():
            raise ValidationError("Content name already taken.")
```

When admins create content, they'll specify a name, a description, and a price, as well as upload both the PDF and a preview image. We've used WTForm's validators to restrict the file types that can be uploaded for each. Should we decide to branch out from selling PDFs in the future, we can add additional file extensions to the `file` field's `FileAllowed` validator. We could also make individual fields optional by removing their `InputRequired()` or `FileRequired()` validators.

The final part of our form is a custom validator to reject new PDFs with IDs that match existing PDFs. Because we're validating on ID rather than name, admins won't be able to create PDFs with the same name but different capitalization (e.g. "Sherlock Holmes" and "SHERLOCK HOLMES").

We've finished creating our form class. Now we can return to `main.py` and import the class with the following `import` statement, which you can add just below the other imports at the top of the file.

```python
from forms import name_to_id, ContentCreateForm
```

Note that we've also imported `name_to_id`, which we'll use when populating the database.

### Admin routes

We can now use our form to implement our content creation route. Populate the `content_create` function with this code:

```python
# Admin functionality
@app.route('/admin/content-create', methods=["GET", "POST"])
@web.authenticated
@admin_only
def content_create():

    form = ContentCreateForm()

    if request.method == "POST" and form.validate():
        content_name = form.name.data
        content_id = name_to_id(content_name)
        content_price = form.price.data

        content_file = form.file.data
        content_filename = secure_filename(content_file.filename)
        content_file.save(os.path.join('content', content_filename))

        image_file = form.image.data
        image_filename = secure_filename(image_file.filename)
        image_file.save(os.path.join('static', image_filename))

        content_paywalled = content_price > 0

        # Construct content dictionary
        db["content"][content_id] = {
            "name": content_name,
            "description": form.description.data,
            "filename": content_filename,
            "preview_image": image_filename,
            "paywalled": content_paywalled,
            "price": content_price,
        }

        flash("Content created!")
        return redirect(url_for('content', content_id=content_id))

    return render_template("admin/content-create.html",
        form = form,
        **context())
```

First, we create an instance of `ContentCreateForm`. This will automatically use the values in `request.form`, including the uploaded files. We then check whether the current request is an HTTP POST, and we call `validate()` on the form. Behind the scenes, this method will run all of our field validators, and return error messages to the user for fields that fail validation. It will only return `True` once all fields validate.

Once we know we've got valid form input, we can save its data to our database. We construct our content's ID using the helper function from `forms.py`, store our content's price value, and then save our PDF and image files to the `content` and `static` directories. Saving images to `static` will allow Flask to serve them without us writing additional code. We'll need custom code for PDFs, however, as we need to ensure they're only accessible to paying customers.

We use the variable `content_paywalled` to determine whether this PDF should be available for free or behind a paywall.

Finally, we save our content's details to the database and redirect the creator to the content page, which we'll build in the next section.

At the bottom of the function, we render our `content-create` page and tell it which form to use. This will happen regardless of whether the initiating request was a GET or a POST. We'll create the template and define the `context` function when we build the application front-end.

Next, we need to create our database flushing functionality. Populate the `flush_db` function with the following code:

```python
@app.route('/admin/db-flush')
@web.authenticated
@admin_only
def flush_db():
    # clear db
    del db["content"]
    del db["orders"]

    # clear users
    for _, user in users.items():
        user["content_library"] = []

    # delete content and images
    shutil.rmtree("content")
    shutil.rmtree("static")

    # reinit
    db_init()

    return redirect(url_for("index"))
```

After deleting all database content and uploaded files, we call `db_init()` to start afresh. Keep in mind that this function should not be used if you're storing real user data unless you've made a backup.

## Content viewing and paywalls

Now that our site admins can upload PDFs, we need a way for users to view them. We'll start by creating another helper function, just below the definition of `is_admin`:

```python
def owns_content(username, content_id):
    if "content_library" in users[username].keys() and users[username]["content_library"] is not None:
        return content_id in users[username]["content_library"]
```

We have to do several checks on our user's `content_library`, as it can be in a few different states – the key might not exist, or it might be set to None, or it might be a list. We'll use this function to determine which content has been purchased by a given user and thus avoid writing all these checks again.

Now we need to create our application's content-viewing routes. We'll start by rewriting the `/` route so that it renders a template rather than a greeting string. This page will contain a list of PDFs. Change the code in `index` to the following:

```python
# Main app
@app.route("/")
@web.authenticated
def index():
    return render_template("index.html",
        **context())
```

Then we'll write a route that displays individual PDF metadata, by adding this function just below the definition of `index`:

```python
@app.route("/content/<content_id>")
@web.authenticated
def content(content_id):
    return render_template("content.html",
        content_id=content_id,
        **context())
```

The `content_id` value will be the same ID that we're using in our database. This page will contain the content's name, preview image, description, and either a download link, or a purchase link, depending on whether the PDF is paywalled, and whether the current user has purchased it.

Lastly, we need a route that handles downloading actual PDFs. Add the following code just below the `content` function definition:

```python
@app.route("/content-file/<content_id>")
@web.authenticated
def content_file(content_id):

    content = db["content"][content_id]

    if not content["paywalled"] or owns_content(web.auth.name, content_id):
        return send_from_directory("content", path=content["filename"])
    else:
        return "Access denied."
```

If the current user owns this PDF, or it's not paywalled, we use Flask's [`send_from_directory`](https://flask.palletsprojects.com/en/2.0.x/api/#flask.send_from_directory) to allow them to download it. Otherwise, we return an error message.

## Creating the application frontend

We have most of our application back-end, so now let's create the front-end. We'll do this using HTML and [Jinja](https://jinja.palletsprojects.com/en/3.0.x/templates/), Flask's front-end templating language.

First, let's create the following HTML files in a new directory called `templates`:

```
templates/
    |__ admin/
    |     |__  content-create.html
    |__  _macros.html
    |__  content.html
    |__  index.html
    |__  layout.html
```

![Folder structure](https://docimg.replit.com/images/tutorials/29-paid-content-site/folder-structure.png)

Once you've created these files, let's populate them, starting with `templates/layout.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Books and Manuscripts</title>
  </head>
  <body>
    {% with messages = get_flashed_messages() %} {% if messages %}
    <ul class="flashes">
      {% for message in messages %}
      <li>{{ message }}</li>
      {% endfor %}
    </ul>
    {% endif %} {% endwith %} {% if name != None %}
    <p>Logged in as {{ username }}</p>
    {% endif %} {% block body %}{% endblock %}
  </body>
</html>
```

We'll use this file as the base of all our pages, so we don't need to repeat the same HTML. It contains features we want on every page, such as flashed messages, and an indication of who's currently logged in. All subsequent pages will inject content into the body block:

```jinja
{% block body %}{% endblock %}
```

Next, we need to populate another helper file, `templates/_macros.html`:

```html
{% macro render_field(field) %}
<dt>{{ field.label }}</dt>
<dd>
  {{ field(**kwargs)|safe }} {% if field.errors %}
  <ul class="errors">
    {% for error in field.errors %}
    <li>{{ error }}</li>
    {% endfor %}
  </ul>
  {% endif %}
</dd>
{% endmacro %}
```

This file defines the [Jinja macro](https://jinja.palletsprojects.com/en/3.0.x/templates/#macros) `render_field`, which we'll use to provide our form fields with error-handling, provided by WTForms.

We'll use this macro in `templates/admin/content-create.html`, which we'll populate with the following code:

```html
{% extends "layout.html" %} {% block body %} {% from "_macros.html" import
render_field %}
<h1>Upload content item</h1>
<form
  action="/admin/content-create"
  method="post"
  enctype="multipart/form-data"
>
  {{ render_field(form.name) }} {{ render_field(form.description) }} {{
  render_field(form.file) }} {{ render_field(form.image) }} {{
  render_field(form.price) }} {{ form.csrf_token }} {{ form.submit }}
</form>
{% endblock %}
```

Here, `{% extends "layout.html" %}` tells our templating engine to use layout.html as a base template, and `{% block body %} ... {% endblock %}` defines the code to place inside layout.html's body block.

Our `render_function` macro will be used to show our different form fields – some of these will be text input fields, while others will be file upload fields. Our form also has a hidden field specified by `{{ form.csrf_token }}`. This is a security feature WTForms provides to prevent [cross-site request forgery](https://owasp.org/www-community/attacks/csrf) vulnerabilities.

Let's define our home page now, with a list of content items. Add the following code to `templates/index.html`:

```html
{% extends "layout.html" %} {% block body %}
<h1>Marketplace</h1>
<ul>
  {% for id, content in content.items() %}
  <li>
    <a href="/content/{{ id }}">{{ content.name }}</a>
    {% if content.paywalled %} {% if id in my_library %} (PURCHASED) {% else %}
    ({{ "${:,.2f}".format(content.price) }}) {% endif %} {% endif %}
  </li>
  {% endfor %} {% if admin %}
  <li><a href="/admin/content-create">NEW CONTENT...</a></li>
  {% endif %}
</ul>

{% if admin %}
<h1>Admin functions</h1>
<ul>
  <li><a href="/admin/db-flush">Flush database</a></li>
</ul>
{% endif %} {% endblock %}
```

We display each piece of content in a list. If an item is paywalled, we show its price if the current user hasn't already purchased it, or "(PURCHASED)" if they have.

In addition, we use `{% if admin %}` blocks to include links to admin functionality, such as content creation and database flushing, that will only display when an admin is logged in.

The last page we need to create is `templates/content.html`, which will display information about individual PDFs:

```html
{% extends "layout.html" %} {% block body %}
<h1>{{ content[content_id].name }}</h1>
<img src="/{{ content[content_id].preview_image }}" style="max-width: 150px" />
<p>{{ content[content_id].description }}</p>
{% if content_id in my_library or not content[content_id].paywalled %}
<a href="/content-file/{{ content_id }}">Download PDF</a>
{% else %}
<form action="/checkout/{{ content_id }}" method="POST">
  <button type="submit" id="checkout-button">
    Buy {{ content[content_id].name }} for {{
    "${:,.2f}".format(content[content_id].price) }}
  </button>
</form>
{% endif %} {% endblock %}
```

As with the home page, we display different parts of the page depending on whether the content is paywalled, and whether the current user owns it. If the user must purchase the PDF, we include a single-button form that posts to `/checkout/<content_id>`, an application route we'll create in the next section.

We've referred to a lot of different variables in our front-end templates. Flask's Jinja templating framework allows us to pass the variables we need into `render_template`, as we did when building the application backend. Our content creation page needed a form, and our content viewing pages needed an ID. In addition, we unpack the return value of a function named `context` to all of our rendered pages. Define this function now with our other helper functions in `main.py`, just below `owns_content`:

```python
def context():
    if "content_library" in users.current.keys() and users.current["content_library"] is not None:
        my_library = users.current["content_library"]
    else:
        my_library = []

    return {
        "username": web.auth.name,
        "my_library": my_library,
        "admin": is_admin(web.auth.name),
        "content": db["content"]
    }
```

This will give every page most of the application's state, including the full content dictionary and the current user's library. If we find we need another piece of state later, we can add it to the `context` helper function, and it will be available to all our pages.

Run your repl now and add some content. For best results, open the site in a new tab, rather than using it in your repl's browser.

![Open in new window](https://docimg.replit.com/images/tutorials/29-paid-content-site/open-new-window.png)

If you add free PDFs, you'll be able to download them, but you won't be able to purchase paywalled PDFs yet.

![Free pdf download](https://docimg.replit.com/images/tutorials/29-paid-content-site/free-pdf-download.png)

## Integrating with Stripe

Our application is fully functional for free PDFs. To have users pay for premium PDFs, we'll integrate [Stripe Checkout](https://stripe.com/en-gb-us/payments/checkout). This will save us the trouble and risk of developing our own payment gateway or storing users' card details.

To use Stripe Checkout, you will need an activated Stripe account. Create one now at [https://stripe.com](https://stripe.com/) if you haven't already.

Once you've created a Stripe account, add the following code near the top of `main.py`, just below the `import` statements:

```python
# Stripe setup
stripe.api_key = os.environ["STRIPE_KEY"]

DOMAIN = "YOUR-REPL-URL-HERE"
```

You can find your Stripe API keys on [this page of the developer dashboard](https://dashboard.stripe.com/test/apikeys). Make sure that you're in test mode and copy the secret key to your clipboard. Then return to your repl and create an environment variable called `STRIPE_KEY` with the value you just copied from Stripe.

![Stripe Key](https://docimg.replit.com/images/tutorials/29-paid-content-site/stripe-key.png)

You will also need to replace the value of `DOMAIN` with your repl's root URL. You can get this URL from the in-repl browser.

![Repl URL](https://docimg.replit.com/images/tutorials/29-paid-content-site/repl-url.png)

### Stripe Checkout

Stripe provides detailed technical documentation and code snippets in a variety of languages, so setting up basic integration is largely a matter of copying and adapting these code snippets to our needs. We'll start by creating the `/checkout/<content_id>` route. This will create a new Stripe [checkout session](https://stripe.com/docs/api/checkout/sessions) and redirect the user to a Stripe payment page. Add the following code below your `content_file` function definition:

```python
# Stripe integration
@app.route("/checkout/<content_id>", methods=["POST"])
@web.authenticated
def checkout(content_id):

    # Proceed to checkout
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": db["content"][content_id]["name"],
                            "images": [DOMAIN + "/" + db["content"][content_id]["preview_image"]]
                        },
                        'unit_amount': int(db["content"][content_id]["price"]*100),
                    },
                    "quantity": 1
                },
            ],
            payment_method_types=[
              'card',
            ],
            mode='payment',
            success_url=DOMAIN + '/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=DOMAIN + '/cancel'
        )
    except Exception as e:
        return str(e)

    # Record order
    order_id = checkout_session.id
    db["orders"][order_id] = {
        "content_id": content_id,
        "buyer": web.auth.name
    }

    return redirect(checkout_session.url, code=303)
```

This code is adapted from Stripe's [sample integration Python code](https://stripe.com/docs/checkout/integration-builder?server=python). It initiates a checkout from the pricing and product details we provide and redirects the user to Stripe's checkout website to pay. If payment is successful, it sends the user to a `success_url` on our site; otherwise, it sends to the user to a `cancel_url`. We'll define both of these shortly.

We've made two key changes to the sample code. First, we've included the details for our content item in `line_items`:

```python
line_items=[
    {
        "price_data": {
            "currency": "usd",
            "product_data": {
                "name": db["content"][content_id]["name"],
                "images": [DOMAIN + "/" + db["content"][content_id]["preview_image"]]
            },
            'unit_amount': int(db["content"][content_id]["price"]*100),
        },
        "quantity": 1
    },
],
```

Rather than defining individual products on Stripe's side, we're programmatically constructing our products at checkout time. This saves us from having to add our PDF metadata in two places. We provide our product's name, and the full URL of its preview image, so both can be shown on the Stripe Checkout page. As Stripe expects prices in cents, we multiply the price from our database by 100 before converting it to an integer.

The second change we've made to the sample code is to record the order details in our database. We need to do this so that we can fulfill the order once it's paid for.

```python
    # Record order
    order_id = checkout_session.id
    db["orders"][order_id] = {
        "content_id": content_id,
        "buyer": web.auth.name
    }
```

We reuse Stripe's [Checkout Session](https://stripe.com/docs/api/checkout/sessions/object) object's `id` as our `order_id` so that we can link the two later.

If you run your repl now, you should be able to reach the Stripe checkout page for any paywalled content you've added. Don't try to pay for anything yet though, as we still need to build order fulfillment.

![Paywall](https://docimg.replit.com/images/tutorials/29-paid-content-site/alice-paywall.png)
![Checkout page](https://docimg.replit.com/images/tutorials/29-paid-content-site/checkout-page.png)

### Stripe fulfillment

As we're selling digital goods, we can integrate fulfillment directly into our application by adding purchased content to the buyer's library as soon as payment has been made. We'll do this with a function called `fulfill_order`, which you can add just below the `checkout` function definition.

```python
def fulfill_order(session):
    # Get order details
    content_id = db["orders"][session.id]["content_id"]
    buyer = db["orders"][session.id]["buyer"]

    # Add content to library
    if session.payment_status == "paid" and not owns_content(buyer, content_id):
        if users[buyer]["content_library"] is not None:
            users[buyer]["content_library"].append(content_id)
        else:
            users[buyer]["content_library"] = [content_id]
```

This function takes a Stripe Checkout Session object, retrieves the corresponding order from our database, and then adds the order's content to the buyer's library if a payment has been made, and the buyer does not already own the content.

We'll invoke this function from our `/success` route, which we'll define just below it.

```python
@app.route('/success', methods=['GET'])
@web.authenticated
def success():

    # Get payment info from Stripe
    session = stripe.checkout.Session.retrieve(request.args.get('session_id'))

    # Abort if user is not buyer
    if web.auth.name != db["orders"][session.id]["buyer"]:
        return "Access denied."

    fulfill_order(session)

    return render_template_string(f'<html><body><h1>Thanks for your order, {web.auth.name}!</h1><p>Your purchase has been added to your <a href="/">library</a>.</p></body></html>')
```

Here we retrieve the session details from the `session_id` GET parameter Stripe passed to our app, ensure that the current user is also the order buyer, and call `fulfill_order`. We then render a simple success page. You can replace this with a full Jinja template if you want to make it a bit fancier.

We also need to define the `/cancel` route, used if the payment fails. This one is quite simple:

```python
@app.route('/cancel', methods=['GET'])
@web.authenticated
def cancel():
    return render_template_string("<html><body><h1>Order canceled.</h1></body></html>")
```

If you run your repl now, you should be able to purchase content. You can find test credit card numbers on the Stripe integration [testing](https://stripe.com/docs/testing) documentation page. You can use any future date as the expiry date and any CVV.

![PDF purchased](https://docimg.replit.com/images/tutorials/29-paid-content-site/alice-purchased.gif)

### Webhooks

A potential problem with the way we're fulfilling orders is that a user might close the Stripe Checkout tab or lose internet connectivity after their payment has been confirmed, but before they're redirected to our `/success` route. If this happens, we'll have their money, but they won't have their PDF.

For this reason, Stripe provides an additional method for fulfilling orders, based on [webhooks](https://en.wikipedia.org/wiki/Webhook). A webhook is an HTTP route intended to be used by machines rather than people. Much like we've created routes for our admins to upload PDFs, and our users to buy PDFs, we'll now create a route for Stripe's bots to notify our application of completed payments.

First, you'll need to create a webhook on your Stripe Dashboard. Visit the [Webhooks](https://dashboard.stripe.com/test/webhooks) page and click **Add endpoint**. You should then see a page like this:

![Add webhook](https://docimg.replit.com/images/tutorials/29-paid-content-site/add-webhook.png)

On this page, do the following:

1. For the **Endpoint URL** value, enter your repl's URL, followed by `/fulfill-hook`.
2. Select the `checkout.session.completed` event from **Select events to listen to**.

   ![Webhook event](https://docimg.replit.com/images/tutorials/29-paid-content-site/webhook-event.png)

3. Click **Add endpoint**.

Stripe should then redirect you to your new webhook's details page. From here you can see webhook details, logs and the signing secret. The signing secret is used to ensure that our webhook only accepts requests from Stripe – otherwise, anyone could call it with spoofed data and complete orders without paying. Reveal your webhook's signing secret and copy it to your clipboard, then return to your repl.

![Signing secret](https://docimg.replit.com/images/tutorials/29-paid-content-site/signing-secret.png)

We'll use another environment variable here. Add the following code below your `cancel` function definition:

```python
endpoint_secret = os.environ['ENDPOINT_SECRET']
```

Then create an environment variable called `ENDPOINT_SECRET` with the value you just copied from Stripe.

For our app's webhook code, we can once again tweak Stripe's sample code. We'll use [this order fulfillment code](https://stripe.com/docs/payments/checkout/fulfill-orders#fulfill) as a base. Add this code below your `endpoint_secret` assignment:

```python
@app.route('/fulfill-hook', methods=['POST'])
def fulfill_webhook():
    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        # Fulfill the purchase...
        fulfill_order(session)
    else:
        print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)
```

After ensuring that the request we've received comes from Stripe, we retrieve the Checkout Session object from Stripe's `checkout.session.completed` event and use it to call `fulfill_order`.

If you run your repl now, you should be able to purchase a PDF, close the checkout page after your payment is accepted but before being redirected, and still end up with the PDF in your library. You can also view webhook invocation logs on the [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks).

![Stripe webhook success](https://docimg.replit.com/images/tutorials/29-paid-content-site/stripe-webhook-success.png)

## Where next?

We've built a functional if fairly basic storefront for digital goods. If you'd like to continue with this project, consider the following extensions:

- Improving the site's appearance with custom CSS.
- Branching out from PDFs to other files, such as audio podcasts, videos, or desktop software.
- Providing a subscription option that gives users access to all PDFs for a limited time.
- Converting the site into a peer-to-peer marketplace where users can all upload and purchase files from each other.

You can find the code for this tutorial here:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/pdf-store?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
