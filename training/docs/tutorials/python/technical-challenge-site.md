---
title: Technical challenge site with replit.web
---

# Build a team technical challenge website with `replit.web`

Code competitions and hackathons are a fun way to expand your programming skills, get exposed to new ideas, and work together to solve difficult problems. The time-limited, competitive nature of these competitions provides an additional challenge.

In this tutorial, we'll use the `replit.web` framework to build a leaderboard website for an online technical challenge in the vein of [Advent of Code](https://adventofcode.com/) or [Hackasat](https://www.hackasat.com/). We'll focus on the generic aspects of the site, such as teams, challenges and scores, so once we're done, you can use the site for your own competition.

![Challenge site functionality](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/site-functionality.gif)

By the end of this tutorial, you'll be able to:

- Use Replit's Flask-based web framework to rapidly develop authenticated web applications with persistent storage.
- Use WTForms to create sophisticated web forms.
- Use custom function decorators to handle multiple user roles.

## Getting started

To get started, sign into [Replit](https://replit.com) or [create an account](https://replit.com/signup) if you haven't already. Once logged in, create a Python repl.

![Creating a new repl](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/create-python-repl.png)

Our competition website will have the following functionality:

- Users can sign in with their Replit accounts and either create a team or join an existing team. To join an existing team, a team password will be required.
- Once they're in a team, users will be able to view challenges and submit challenge solutions. To keep things simple, we will validate challenge solutions by requiring users to submit a unique code per challenge.
- A designated group of admin users will have the ability to add and remove challenges, start and end the competition, and clear the database for a new competition.

Let's start off our competition application with the following module imports in `main.py`:

```python
from flask import Flask, render_template, flash, redirect, url_for, request
from replit import db, web
```

Here we're importing a number of Flask features we'll need. We could just use `import flask` to import everything, but we'll be using most of these functions often enough that having to prepend them with `flask.` would quickly become tiresome. We're also importing Replit's `db` and `web` modules, which will give us data persistence and user authentication.

Now let's create our app and initialize its database. Add the following code just below the import statements in `main.py`:

```python
app = Flask(__name__)

# Secret key
app.config['SECRET_KEY'] = "YOUR-SECRET-KEY-HERE"

# Database setup
db_init()
users = web.UserStore()

ADMINS = ["YOUR-REPLIT-USERNAME-HERE"]
```

Here we initialize our application, our general and user databases, and our list of admins. Make sure to replace the string in `ADMINS` with your Replit username before proceeding. Also replace the secret key with a long, random string. You can generate one in your repl's Python console with the following two lines of code:

```python
import random, string
''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
```

![Generating a random string](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/randomstring.png)

You'll notice that `db_init()` is undefined. As this is going to be a fairly large codebase, we're going to put it in a separate file. Create the file `db_init.py` in your repl's files tab:

![Database init file](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/dbinit.png)

Add the following code to this file:

```python
from replit import db

def db_init():
    if "teams" not in db.keys():
        db["teams"] = {}

    if "challenges" not in db.keys():
        db["challenges"] = {}

    if "competition_started" not in db.keys():
        db["competition_started"] = False
```

[Replit's Database](/hosting/databases/replit-database). Any values we store in `db` will persist between repl restarts.

To import this file in `main.py`, we can use an `import` statement in much the same way as we would for a module. Add this line in `main.py`, below your other imports:

```python
from db_init import db_init
```

We've also defined a secondary database `users` in `main.py`. While `db` only contains what we put into it, `users` is a [UserStore](https://replit-py.readthedocs.io/en/latest/api.html) that will automatically have the names of users who sign into our application added as keys, so we can easily store and retrieve information about them.

Now let's create some test content and run our app. Add the following code, and then run your repl.

```python
# Routes
@app.route("/")
@web.authenticated
def index():
    return f"Hello {web.auth.name}"

web.run(app)
```

Because we've added the `@web.authenticated` [function decorator](https://realpython.com/primer-on-python-decorators/) to our index page, it will only be available to logged in users. You should see this now, as your app will show a login button. Click on that button, and authorize your application to use Replit authentication in the window that pops up.

![Login Button](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/login-button.png)

Having done that, you should now see the greeting we implemented above. If you send your repl to a friend, they will also be able to log in, and see their own Replit username on the greeting message.

## Creating user roles

Function decorators like `@web.authenticated`, which prevent a function from executing unless certain conditions are met, are very useful for web applications like this one, in which we want to restrict certain pages based on who's attempting to view them. `@web.authenticated` restricts users based on _authentication_ -- who a user is. We can now create our own decorators to restrict users based on _authorization_ -- what a user is allowed to do.

For this site, we're concerned about three things:

- Is the user in a team? Users who aren't need to be able to create or join a team, and users who are need to be able to submit challenge solutions.
- Is the user an admin? Users who are need to be able to create challenges, and perform other administrative tasks. For the sake of fairness, they should not be allowed to join teams themselves.
- Is the competition running? If not, we don't want non-admin users to be able to view challenge pages or attempt to submit solutions.

First, we'll create two helper functions to answer these questions. Add the following code to `main.py`, just below your ADMINS list:

```python
# Helper functions
def is_admin(username):
    return username in ADMINS

def in_team(username):
    if "team" in users[username].keys():
        return users[username]["team"]
```

The `is_admin()` function will return `True` if the provided user is an admin, or `False` otherwise. The function `in_team()` will return the name of the team the user is in, or `None` if they aren't in a team.

Now we can create our authorization function decorators. Add the following import function to the top of `main.py`:

```python
from functools import wraps
```

Then add this code below our helper functions:

```python
# Authorization decorators
def admin_only(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if not is_admin(web.auth.name):
            flash("Permission denied.", "warning")
            return redirect(url_for("index"))

        return f(*args, **kwargs)

    return decorated_function
```

This code may look a bit strange if you haven't written your own decorators before. Here's how it works: `admin_only` is the name of our decorator. You can think of decorators as functions which take other functions as arguments. (The code coming up is example code for the purpose of illustration, and not part of our program.) Therefore, if we write the following:

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

We also need to define a decorator for the opposite case, where we need to ensure that the current user is not an admin. Add the following code just below the `# Authorization decorators` code you added above:

```python
def not_admin_only(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if is_admin(web.auth.name):
            flash("Admins can't do that.", "warning")
            return redirect(url_for("index"))

        return f(*args, **kwargs)

    return decorated_function
```

We will do much the same thing for `team_only` and `not_team_only`:

```python
def team_only(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if not in_team(web.auth.name):
            flash("Join a team first!", "warning")
            return redirect(url_for("index"))

        return f(*args, **kwargs)

    return decorated_function

def not_team_only(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if in_team(web.auth.name):
            flash("You've already joined a team!", "warning")
            return redirect(url_for("index"))

        return f(*args, **kwargs)

    return decorated_function
```

Finally, we need to add a decorator to check whether our competition is running. This is mainly for challenge description pages, so we'll add an exception for non-admin users:

```python
def competition_running(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if not (is_admin(web.auth.name) or db["competition_started"]):
            flash("The competition has not started yet.")
            return redirect(url_for("index"))

        return f(*args, **kwargs)

    return decorated_function
```

Now that we've added our authorization controls, it's time to give them something to authorize. In the next sections, we'll define all of our app's functionality and build its front-end.

## Building forms

The bulk of interactivity in our application will be enabled through forms. Users will be able to create and join teams, as well as submit challenge solutions. When we work with web forms, there's a lot to consider, including:

- Which users should be able to submit which forms (authorization)?
- What validation do we want on different fields? For example, length requirements, or ensuring a given value is an integer rather than a string.
- How do we give feedback on data that doesn't pass our validations?
- Security concerns around user input, such as [SQL injection](https://owasp.org/www-community/attacks/SQL_Injection), [cross-site scripting](https://owasp.org/www-community/attacks/xss/) and [cross-site request forgery](https://owasp.org/www-community/attacks/csrf). While the first one won't be relevant to our app, the second two are.

We could build all of this ourselves using Flask's `request.form` as a basis, but fortunately someone else has already done the hard work and built the [WTForms](https://wtforms.readthedocs.io/en/2.3.x/) library, as well as [Flask WTF](https://flask-wtf.readthedocs.io/en/0.15.x/), which integrates `WTForms` with Flask. We'll be using both of these to construct our application's various forms.

To keep our codebase navigable, we'll put all our form code in a separate file, like we did with our database initialization code. Create `forms.py` in your repl's files tab now:

![Building forms](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/forms.png)

We'll start this file off with some imports:

```python
from replit import db
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, PasswordField, SelectField, IntegerField, ValidationError
from wtforms.validators import InputRequired, NumberRange, Length
```

Here we import our Replit database, which we'll need for uniqueness validations, as well as everything we'll be using from WTForms and Flask WTF.

Before we get started with our forms, it's worth thinking about how we're going to lay out the data structures they'll be used to create and modify. In `db_init.py`, we've defined two dictionaries -- "challenges" and "teams". Each of these will contain a dictionary for each challenge or team, keyed by an ID. Our data structure will look something like this:

```json
{
  "challenges": {
    "ID": {
      "name": "NAME",
      "description": "DESCRIPTION",
      "points": 10,
      "code": "CHALLENGE SOLUTION CODE"
    }
  },
  "teams": {
    "ID": {
      "name": "NAME",
      "team_leader": "LEADER NAME",
      "team_members": ["LEADER NAME", "ADDITIONAL MEMBER"],
      "score": 0,
      "password": "TEAM PASSWORD",
      "challenges_solved": ["CHALLENGE ID", "ANOTHER CHALLENGE ID"]
    }
  }
}
```

The ID value for both our challenges and teams will be the challenge or team name, all-lowercase, with spaces replaced by hyphens, so we can use it in our app's URLs. Let's create a function that turns names into IDs, in `forms.py`, just below our imports:

```python
def name_to_id(name):
    return name.lower().replace(" ", "-")
```

Now we can start creating our forms. With Flask WTF, we model each form as a class inheriting from `FlaskForm`. These classes take in the value of Flask's `request.form` and apply validations to the fields therein. We'll create our `TeamCreateField` first, with the following code:

```python
class TeamCreateForm(FlaskForm):
    name = StringField(
        "Team name",
        validators=[
            InputRequired(),
            Length(3)
            ]
    )

    password = PasswordField(
        "Team password",
        validators=[
            InputRequired(),
            Length(8)
        ]
    )

    submit = SubmitField("Create team")

    def validate_name(form, field):
        if name_to_id(field.data) in db["teams"].keys():
            raise ValidationError("Team name already taken.")
```

When users create teams, they'll specify a team name and team password. In our WTForms field specifications above, we've defined minimum lengths for both of these fields, ensured that the team password is entered in a password field, and written a custom validator to reject new teams with IDs that match existing teams. Because we're validating on ID rather than name, users won't be able to create teams with the same name but different capitalization (e.g. "Codeslingers" and "codeslingers").

Every field in all of our forms includes the `InputRequired` validator, which will ensure that users do not submit blank values. This validator can be left out for optional fields.

Our `ChallengeCreateForm` is similar to `TeamCreateForm`, and can be added below it:

```python
class ChallengeCreateForm(FlaskForm):
    name = StringField(
        "Challenge name",
        validators=[
            InputRequired(),
            Length(3)
        ]
    )

    description = TextAreaField(
        "Challenge description",
        validators=[InputRequired()]
    )

    points = IntegerField(
        "Challenge points",
        validators=[
            InputRequired(),
            NumberRange(1)
        ]
    )

    code = StringField("Challenge code",
        validators=[
            InputRequired(),
            Length(8)
        ]
    )

    submit = SubmitField("Create challenge")

    def validate_name(form, field):
        if name_to_id(field.data) in db["challenges"].keys():
            raise ValidationError("Challenge name already used.")
```

Here we've used the `TextAreaField` to give a bit more space for our users to write challenge descriptions, and `IntegerField` to specify the number of points a challenge is worth. We're also requiring that challenges be worth at least 1 point, using the `NumberRange` validator.

Next up is our `TeamJoinForm`:

```python
class TeamJoinForm(FlaskForm):
    name = SelectField(
        "Team to join",
        choices= [
            (team_id, team["name"]) for team_id, team in db["teams"].items()
        ],
        validators=[InputRequired()]
    )

    password = PasswordField(
        "Team password",
        validators=[InputRequired()]
    )

    submit = SubmitField("Join team")
```

In this form, we're creating a drop-down box with the names of existing teams. The list comprehension in `choices` constructs a tuple for each team, consisting of the team's ID and name. This way, we can use the ID to identify teams on the backend while displaying the name to the user.

Our last form is `ChallengeSolveForm`, which users will use to submit challenge solutions. Add it to the bottom of `forms.py`:

```python
class ChallengeSolveForm(FlaskForm):
    code = StringField("Challenge code",
        validators=[
            InputRequired(),
        ]
    )

    submit = SubmitField("Submit solution code")
```

As we'll be including this form on the individual challenge pages, we don't need to ask the user to specify which challenge they're solving.

Finally, we'll need to import our forms and helper function into `main.py` so we can use them in the rest of our app. Add the following line to the import statements in `main.py`:

```python
from forms import TeamCreateForm, TeamJoinForm, ChallengeCreateForm, ChallengeSolveForm, name_to_id
```

Now that we have our form logic, we need to integrate them into both the front-end and back-end of the application. We'll deal with the back-end first.

## Building back-end functionality

Back-end functionality is the heart of our application. Below, we'll define our application's routes and build the logic for creating and joining teams, as well as creating and solving challenges.

### Team functionality

Let's start with teams. We'll define the following routes and functions in `main.py`, below our `index()` function:

```python
# Teams
@app.route("/team-create", methods=["GET", "POST"])
@web.authenticated
@not_admin_only
@not_team_only
def team_create():
    pass

@app.route("/team-join", methods=['GET', 'POST'])
@web.authenticated
@not_admin_only
@not_team_only
def team_join():
    pass

@app.route("/team/<team_id>")
def team(team_id):
    pass

```

The `/team-create` and `/team-join` routes will use their respective forms. Users already in teams and admins will not be permitted to create or join teams. The `/team/<team_id>` page will be an informational page, showing the team's name, score, and which challenges they've solved. We're using part of the URL as a parameter here, so, for example, `/team/codeslingers` will take us to the team page for that team. We won't require authentication for this page.

Because we'll be dealing with passwords, we're going to store them as [one-way encrypted hashes](https://en.wikipedia.org/wiki/Hash_function). This will prevent anyone with access to our repl's database from easily seeing all team passwords. We'll use Flask's `Bcrypt` extension for this, which you can install by searching for "flask-bcrypt" in the Packages tab on the Replit IDE sidebar.

![Flask bcrypt package](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/bcrypt-package.gif)

While Replit usually automatically installs packages based on our import statements, this one must be manually installed, as its package name is slightly different on Pypi and on disk. Once it's installed, we import it with the following additional line at the top of `main.py`:

```python
from flask_bcrypt import Bcrypt
```

Then we initialize a `Bcrypt` object for our app by adding the following line just below `app = Flask(__name__)`:

```python
bcrypt = Bcrypt(app)
```

Now let's add some code to our `team_create` function:

```python
@app.route("/team-create", methods=["GET", "POST"])
@web.authenticated
@not_admin_only
@not_team_only
def team_create():

    form = TeamCreateForm(request.form)

    if request.method == "POST" and form.validate():
        team_name = form.name.data
        team_id = name_to_id(team_name)

        hashed_password = bcrypt.generate_password_hash(form.password.data).decode("utf-8")
        team_leader = web.auth.name

        # Construct team dictionary
        db["teams"][team_id] = {
            "name": team_name,
            "password": hashed_password,
            "leader": team_leader,
            "members": [team_leader],
            "score": 0,
            "challenges_solved": []
        }

        # Set user team
        users.current["team"] = team_id

        flash("Team created!")
        return redirect(url_for('team', team_id=team_id))

    return render_template("team-create.html",
        form = form,
        **context())
```

First, we create an instance of `TeamCreateForm` using the values in `request.form`. We then check whether the current request is an HTTP `POST`, and we call `validate()` on the form. Behind the scenes, this method will run all of our field validators, and return error messages to the user for fields that fail validation. It will only return `True` once all fields validate.

Once we know we've got valid form input, we can save its data to our database. We construct our team's ID using the helper function from `forms.py`, hash our team password, and then define our team's dictionary.

After that, we set the current user's team in our user database and redirect the user to their new team's page. We use `users.current` as an alias for `users[web.auth.name]`.

At the bottom of the function, we render our `team-create` page and tell it which form to use. This will happen regardless of whether the initiating request was a `GET` or a `POST`. We'll create the template and define the `context` function when we build the front-end.

Now we can add the code for joining a team, in the `team_join` function:

```python
@app.route("/team-join", methods=['GET', 'POST'])
@web.authenticated
@not_admin_only
@not_team_only
def team_join():

    form = TeamJoinForm(request.form)

    if request.method == "POST" and form.validate():
        team_id = form.name.data
        team_name = db["teams"][team_id]["name"]

        if bcrypt.check_password_hash(
                db["teams"][team_id]["password"],
                form.password.data
            ):
            db["teams"][team_id]["members"].append(web.auth.name)
            users.current["team"] = team_id

            flash(f"You joined {team_name}!")
            return redirect(url_for('team', team_id=team_id))
        else:
            flash(f"Wrong password for {team_name}!")
            return redirect(url_for("index"))

    return render_template("team-join.html",
        form = form,
        **context())
```

If our form validates, we check the provided team password, and if it's correct, we add the current user to the team and send them to the team page. If it's incorrect, we redirect them to the home page.

Finally, we can define our `/team/<team_id>` route, by adding this code to the `team()` function:

```python
@app.route("/team/<team_id>")
def team(team_id):
    return render_template("team.html",
        team_id = team_id,
        **context())
```

### Admin functionality

We're going to let admin users add challenges to the front-end so that we can keep our code generic and re-use it for multiple competitions, if we wish. We'll add the other admin functionality we need at the same time.

We'll start with the challenge creation route. Add this code below your team routes:

```python
# Admin functions
@app.route("/admin/challenge-create", methods=["GET", "POST"])
@web.authenticated
@admin_only
def admin_challenge_create():

    form = ChallengeCreateForm(request.form)

    if request.method == "POST" and form.validate():
        challenge_name = form.name.data
        challenge_id = name_to_id(challenge_name)
        hashed_code = bcrypt.generate_password_hash(form.code.data).decode("utf-8")

        # Construct challenge dictionary
        db["challenges"][challenge_id] = {
            "name": challenge_name,
            "description": form.description.data,
            "points": int(form.points.data),
            "code": hashed_code
        }

        flash("Challenge created!")
        return redirect(url_for('challenge', challenge_id=challenge_id))

    return render_template("admin/challenge-create.html",
        form = form,
        **context())
```

This code is almost identical to our team creation functionality. While hashing challenge codes may not be strictly necessary, it will prevent any users with access to our repl from cheating by viewing the database.

Challenge removal is a bit simpler:

```python
@app.route("/admin/challenge-remove/<challenge_id>")
@web.authenticated
@admin_only
def admin_remove_challenge(challenge_id):

    # Remove challenge from team solutions
    for _, team in db["teams"].items():
        if challenge_id in team["challenges_solved"]:
            team["challenges_solved"].remove(challenge_id)
            team["score"] -= db["challenges"][challenge_id]["points"]

    # Delete challenge dictionary
    del db["challenges"][challenge_id]

    flash("Challenge removed!")
    return redirect(url_for('index'))
```

We'll allow admins to start and stop the competition with two routes that toggle a value in our database:

```python
@app.route("/admin/competition-start")
@web.authenticated
@admin_only
def admin_start_competition():
    db["competition_started"] = True

    flash("Competition started!")
    return redirect(url_for('index'))

@app.route("/admin/competition-stop")
@web.authenticated
@admin_only
@competition_running
def admin_end_competition():
    db["competition_started"] = False

    flash("Competition ended!")
    return redirect(url_for('index'))
```

Finally, we'll define an admin route that deletes and reinitializes the application's general and user databases. This will be useful for running multiple competitions on the same app, and for debugging!

```python
@app.route('/admin/db-flush')
@web.authenticated
@admin_only
def flush_db():
    del db["challenges"]
    del db["teams"]
    del db["competition_started"]

    for _, user in users.items():
        user["team"] = None

    db_init()

    return redirect(url_for("index"))
```

If we add any additional keys or values to either of our databases, we will need to remember to delete them in this function.

### Challenge functionality

Finally, we need to add functionality that will allow users to solve challenges and score points. Add the following code below your admin routes:

```python
# Challenge functionality
@app.route("/challenge/<challenge_id>", methods=["GET", "POST"])
@web.authenticated
@competition_running
def challenge(challenge_id):

    form = ChallengeSolveForm(request.form)

    if request.method == "POST" and form.validate():

        if bcrypt.check_password_hash(
                db["challenges"][challenge_id]["code"],
                form.code.data
            ):
            db["teams"][users.current["team"]]["challenges_solved"].append(challenge_id)
            db["teams"][users.current["team"]]["score"] += db["challenges"][challenge_id]["points"]
            flash("Challenge solved!")
        else:
            flash("Wrong challenge code!")

    return render_template("challenge.html",
        form = form,
        challenge_id = challenge_id,
        **context())
```

This function is very similar to `team_join()`. The main difference is that we will be hosting this form on the challenge description page, so we can fetch the `challenge_id` from the URL rather than asking the user which challenge they're submitting a code for in the form.

## Building the web application front-end

We have a fully functional application back-end, but without some front-end pages, our users will have to join teams and submit challenge solutions using [`curl`](https://curl.se/). So let's create an interface for our back-end using HTML and [Jinja](https://jinja.palletsprojects.com/en/3.0.x/templates/), Flask's powerful front-end templating language.

### Creating the HTML templates

First, we'll need the following HTML files in a new directory called `templates`:

```
templates/
    |__ admin/
    |     |__  challenge-create.html
    |__  _macros.html
    |__  challenge.html
    |__  index.html
    |__  layout.html
    |__  leaderboard.html
    |__  team-create.html
    |__  team-join.html
    |__  team.html
```

![HTML templates](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/templates.gif)

Once you've created these files, let's populate them, starting with `templates/layout.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Challenge Leaderboard</title>
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
    {% endif %}

    <ul>
      <li><a href="/">View challenges</a></li>
      <li><a href="/leaderboard">View leaderboard</a></li>
      <li><a href="/team-create">Create team</a></li>
      <li><a href="/team-join">Join team</a></li>
    </ul>

    {% block body %}{% endblock %}
  </body>
</html>
```

We'll use this file as the base of all our pages, so we don't need to repeat the same HTML. It contains features we want on every page, such as flashed messages, an indication of who's currently logged in, and a global navigation menu. All subsequent pages will inject content into the `body` [`block`](https://jinja.palletsprojects.com/en/3.0.x/templates/#child-template):

`{% block body %}{% endblock %}`

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

This file defines the [Jinja macro](https://jinja.palletsprojects.com/en/3.0.x/templates/#macros) `render_field`, which we'll use to give all our form fields their own error-handling, provided by WTForms.

Let's define our home page now, with a list of challenges. Add the following code to `templates/index.html`:

```html
{% extends "layout.html" %} {% block body %}
<h1>Challenges</h1>
<ul>
  {% for id, challenge in challenges.items()|sort(attribute='1.points') %}
  <li>
    <a href="/challenge/{{ id }}">{{ challenge.name }}</a> ({{ challenge.points
    }} points) {% if admin %} |
    <a href="/admin/challenge-remove/{{ id }}">DELETE</a> {% endif %}
  </li>

  <li>{% endfor %} {% if admin %}</li>

  <li><a href="/admin/challenge-create">NEW CHALLENGE...</a></li>
  {% endif %}
</ul>

{% if admin %}
<h1>Admin functions</h1>
<ul>
  {% if competition_running %}
  <li><a href="/admin/competition-stop">End competition</a></li>
  {% else %}
  <li><a href="/admin/competition-start">Start competition</a></li>
  {% endif %}
  <li><a href="/admin/db-flush">Flush database</a></li>
</ul>
{% endif %} {% endblock %}
```

Here, `{% extends "layout.html" %}` tells our templating engine to use `layout.html` as a base template, and `{% block body %} ... {% endblock %}` defines the code to place inside `layout.html`'s body block.

The following line will sort challenges in ascending order of points:

```html
{% for id, challenge in challenges.items()|sort(attribute='1.points') %}
```

In addition, we use `{% if admin %}` blocks to include links to admin functionality that will only display when an admin is logged in.

Next we define our team pages:

`templates/team-create.html`

```html
{% extends "layout.html" %} {% block body %} {% from "_macros.html" import
render_field %}
<h1>Create team</h1>
<form action="/team-create" method="post" enctype="multipart/form-data">
  {{ render_field(form.name) }} {{ render_field(form.password) }} {{
  form.csrf_token }} {{ form.submit }}
</form>
{% endblock %}
```

`templates/team-join.html`

```html
{% extends "layout.html" %} {% block body %} {% from "_macros.html" import
render_field %}
<h1>Join team</h1>
<form action="/team-join" method="post">
  {{ render_field(form.name) }} {{ render_field(form.password) }} {{
  form.csrf_token }} {{ form.submit }}
</form>
{% endblock %}
```

`templates/team.html`

```html
{% extends "layout.html" %} {% block body %}
<h1>{{ teams[team_id].name }}</h1>

<h2>Team members</h2>
<ul>
  {% for user in teams[team_id].members %}
  <li>{{ user }}</li>
  {% endfor %}
</ul>

<h2>Challenges solved</h2>
<ul>
  {% for id in teams[team_id].challenges_solved %}
  <li>
    <a href="/challenge/" {{ id }}>{{ challenges[id].name }}</a>
  </li>

  <li>{% endfor %}</li>
</ul>

{% endblock %}
```

You'll notice that we've imported our `render_function` macro on these pages and used it to show our various form fields. Each form also has a hidden field specified by `{{ form.csrf_token }}`. This is a security feature WTForms provides to prevent [cross-site request forgery](https://owasp.org/www-community/attacks/csrf) vulnerabilities.

Now we can create our challenge page:

`templates/challenge.html`

```html
{% extends "layout.html" %} {% block body %} {% from "_macros.html" import
render_field %}
<h1>{{ challenges[challenge_id].name }}</h1>

<p>{{ challenges[challenge_id].description }}</p>

<p><b>Points: {{ challenges[challenge_id].points }}</b></p>

{% if user_team != None and challenge_id not in
teams[user_team]["challenges_solved"] %}
<form action="/challenge/{{challenge_id}}" method="post">
  {{ render_field(form.code) }} {{ form.csrf_token }} {{ form.submit }}
</form>
{% endif %} {% endblock %}
```

Then our challenge creation page (inside the `templates/admin` directory):

`templates/admin/challenge-create.html`

```html
{% extends "layout.html" %} {% block body %} {% from "_macros.html" import
render_field %}
<h1>Create challenge</h1>
<form
  action="/admin/challenge-create"
  method="post"
  enctype="multipart/form-data"
>
  {{ render_field(form.name) }} {{ render_field(form.description) }} {{
  render_field(form.points) }} {{ render_field(form.code) }} {{ form.csrf_token
  }} {{ form.submit }}
</form>
{% endblock %}
```

We've referred to a lot of different variables in our front-end templates. Flask's Jinja templating framework allows us to pass the variables we need into `render_template()`, as we did when building the application backend. Most pages needed a form, and some pages, such as `challenge` and `team`, needed a challenge or team ID. In addition, we [unpack](https://realpython.com/python-kwargs-and-args/#unpacking-with-the-asterisk-operators) the return value of a function named `context` to all of our rendered pages. Define this function now with our other helper functions in `main.py`, just below `in_team`:

```python
def context():
    return {
        "username": web.auth.name,
        "user_team": in_team(web.auth.name),
        "admin": is_admin(web.auth.name),
        "teams": db["teams"],
        "challenges": db["challenges"],
        "competition_running": db["competition_started"]
    }
```

This will give every page most of the application's state. If we find we need another piece of state later, we can add it to the `context` helper function, and it will be available to all our pages.

Importantly, we're using a function rather than a static dictionary so that we can get the most up-to-date application state every time we serve a page.

Before we move on, we should change our app's home page from the initial demo version we made at the beginning of this tutorial to a proper page. Find the `index()` function and replace it with this code:

```python
@app.route("/")
def index():
    return render_template("index.html",
        **context())
```

You'll notice we've removed the `@web.authenticated` decorator. This will allow unauthenticated users to get a glimpse of our site before being asked to log in. `replit.web` will prompt them to log in as soon as they attempt to access an authenticated page.

## Building the leaderboard

We've left out a key part of our application: the leaderboard showing which team is winning! Let's add the leaderboard frontend now, with the following HTML and Jinja code in `templates/leaderboard.html`:

```html
{% extends "layout.html" %} {% block body %}
<h1>Leaderboard</h1>
<ul>
  {% for id, team in teams.items()|sort(attribute='1.score', reverse=True) %}
  <li {% if id == user_team %}style="font-weight: bold"{% endif %}>
  <a href="/team/{{ id }}">{{ team.name }}</a
  >: {{ team.score }} points
  <li>{% endfor %}</li>
</ul>

{% endblock %}
```

Similar to the list of challenges on our home page, we use Jinja's [sort](https://jinja.palletsprojects.com/en/3.0.x/templates/#jinja-filters.sort) filter to order the teams from highest to lowest score.

```html
{% for id, team in teams.items()|sort(attribute='1.score', reverse=True) %}
```

We also use an `if` block to show the name of the current user's team in bold.

Finally, we can add one last route to `main.py`, just above the line `web.run(app)`:

```python
@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html",
        **context())
```

We're leaving this one unauthenticated as well, so that spectators can see how the competition's going.

## Using the app

We're done! Run your repl now to see your app in action. As your user account will be a site admin, you may need to enlist a couple of friends to test out all the app's functionality.

For best results, open your repl's web page in a new tab.

![Open in new tab button](https://docimg.replit.com/images/tutorials/28-technical-challenge-site/replit-browser-open-in-new-tab.png)

If you run into unexplained errors, you may need to clear your browser cookies, or flush the database.

## Where next?

We've built a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) application with a fair amount of functionality, but there's still room for improvement. Some things you might want to add include:

- CSS styling.
- More admin functionality, such as adjusting scores, banning users and teams, and setting team size limitations.
- File upload, for challenge files and/or team avatars.
- Time-limited competitions, with a countdown.
- Badges/achievements for things like being the first team to solve a given challenge.
- A place for teams to submit challenge solution write-ups.

And of course, you can also use your site to host a competition right now.

You can find code for this tutorial here:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/challenge-website?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
