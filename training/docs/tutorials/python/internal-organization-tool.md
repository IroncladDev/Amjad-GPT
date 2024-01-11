# Building an internal organization tool

Whether you're a small startup without a dedicated internal tools team, or a team within a large company that struggles to get time from engineering, it's often useful to be able to whip up quick-and-dirty internal tools like dashboards, report generators, CRMs, or whatever else you need.

Hosting internal teams on Replit means that you can iterate as quickly as you need to. No more waiting to fit in with a sprint cycle, getting through QA, or getting delayed because of other teams' work. You edit code directly in production, so your changes are instantly deployed.

In this guide, we'll show you how to build a basic CRUD application using Flask and Pico.CSS (internal tools are often ugly, but they shouldn't be). Our template application will let you:

- Put content behind an authentication wall. Only your team will be able to see it, and they'll be able to log in with their existing Replit account.
- Create, read, update, and delete from a database. We'll build a simple task-tracking application, but you can adapt it to whatever you need.
- Deploy it to a production environment directly from your editor and make it run 24/7.

The final application will look like this.

![shared task demo](https://docimg.replit.com/images/teamsPro/internal-tools-flask-sqlite/shared-task-demo.png)

## Building the Python backend

Our Python backend will be a basic Flask web server. We'll have a single object (`Task`), and add functions to add new tasks, delete existing ones, or update them.

Create a new Python repl by visiting [https://repl.new/python](https://repl.new/python) and ensure that it belongs to your Teams Pro account. We'll set up access so only other members of your team can view the contents of the application.

### Adding some CRUD and helper functions

Nearly all applications need to do four things. Create, Read, Update, and Delete data, or CRUD for short.

In the `main.py` file, add the following code that initialises the Flask application, defines a `Task` object, and lets us perform CRUD operations on it.

```python
import os
from datetime import datetime

from flask import Flask, request, render_template, redirect
from flask_sqlalchemy import SQLAlchemy

authorized_teams = set([os.getenv("REPL_OWNER")])

app = Flask(__name__)
app.static_folder = 'static'

project_dir = os.path.dirname(os.path.abspath(__file__))

database_file = "sqlite:///{}".format(os.path.join(project_dir, "todo.db"))
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text)
    done = db.Column(db.Boolean)
    dateAdded = db.Column(db.DateTime, default=datetime.now())

def create_task(text):
    task = Task(text=text)
    db.session.add(task)
    db.session.commit()
    db.session.refresh(task)

def read_tasks():
    return db.session.query(Task).all()

def update_task(task_id, text, done):
    db.session.query(Task).filter_by(id=task_id).update({
        "text": text,
        "done": True if done == "on" else False
    })
    db.session.commit()

def delete_task(task_id):
    db.session.query(Task).filter_by(id=task_id).delete()
    db.session.commit()

def check_team_authorized(replit_user_teams, authorized_teams):
    teams = set(replit_user_teams.split(","))
    user_authorized_teams = teams.intersection(authorized_teams)
    return len(user_authorized_teams) > 0
```

Note the line `authorized_teams = set([os.getenv("REPL_OWNER")])` which gets the repl owner (that is, the team username that the repl belongs to). The `check_team_authorized` function compares all the teams that a user belongs to with this "authorized teams" list and only lets them in if there's a match, so you can also hardcode other teams in here if you need others to access your app.

### Adding routes to our application

We want our users to be able to interact with different routes of our application.

- `/`: the main page of our application will show the tasks and let users edit them or add new ones.
- `/login`: if a user is not logged in, they'll be redirect to a "Log in with Replit" page.
- `/edit/<taskid>`: users won't visit this direclty, but the app will post edit requests from the main page here.
- `/delete/<taskid>`: similar to the above, if the user deletes a task, the request will be forwarded to this route.

Add the following code to the end of your `main.py` file:

```python
@app.route("/edit/<task_id>", methods=["POST"])
def edit_task(task_id):
    update_task(task_id, text=request.form['text'], done=request.form['done'])
    return redirect("/")

@app.route("/delete/<task_id>", methods=['POST'])
def remove_task(task_id):
    delete_task(task_id)
    return redirect("/")

@app.route("/login", methods=["GET", "POST"])
def login():
    user_id = request.headers['X-Replit-User-Id']
    if user_id:
        return redirect("/")
    return render_template("login.html")

@app.route("/",  methods=["GET", "POST"])
def index():
    user_id=request.headers['X-Replit-User-Id']
    if not user_id:
        return redirect("/login")

    teams_header = request.headers['X-Replit-User-Teams']
    user_in_team = check_team_authorized(teams_header, authorized_teams)
    if not user_in_team:
        return render_template("unauthorized.html")
    if request.method == "POST":
        create_task(request.form['text'])
    return render_template("index.html",tasks=read_tasks(),
                       user_id=request.headers['X-Replit-User-Id'],
                       user_name=request.headers['X-Replit-User-Name'],
                       user_roles=request.headers['X-Replit-User-Roles'])

if __name__ == "__main__":
    db.create_all()
    app.run(host='0.0.0.0', debug=True)
```

These routes call the matching CRUD functions we wrote earlier, passing in the data from the user where relevant. Note that we use the `X-Replit-User-ID` header to validate that the user is logged into Replit, and the `X-Replit-User-Teams` header to check which teams they belong to.

### Adding the frontend

We'll have three pages in our application:

- `index.html`: the main page that shows existing tasks and allows the user to interact with tasks.
- `login.html`: a page to show the "Log in with Replit" button.
- `unauthorized.html`: we'll show this to any user who is not part of our team but has logged in with a valid Replit account.

Create all three of these files in a folder named exactly `templates`. Flask looks in this folder specifically whenever you call the `render_template` function, so don't call it something else.

In the `index.html` file, add the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
    <link rel="stylesheet" href="/static/style.css" />
    <script type="text/javascript">
      function redirect(link) {
        window.location.href = link;
      }
    </script>
    <title>todo app</title>
  </head>
  <body>
    <header>Shared Task Tracking</header>

    <main class="container">
      <h1>Our tasks</h1>
      <p>
        Add tasks below. Your team can add new tasks, or edit or delete existing
        ones. You all see the same tasks.
      </p>
      <form method="POST" action="/">
        <div>
          <input
            type="text"
            name="text"
            class="form-control"
            placeholder="Add a new TODO item"
          />
          <div>
            <button type="submit" value="update">Create new</button>
          </div>
        </div>
      </form>

      <h2>Task List</h2>
      {% for task in tasks %}

      <form method="POST" action="/edit/{{task.id}}">
        <div class="task">
          <div class="task-input">
            <input
              type="text"
              title="{{task.dateAdded}}"
              value="{{task.text}}"
              name="text"
            />
          </div>
          <div class="update-btn">
            <button type="submit" value="update">Update</button>
          </div>

          <div class="update-btn">
            <button type="submit" formaction="/delete/{{task.id}}">x</button>
          </div>
        </div>
      </form>

      {% endfor %}
    </main>
  </body>
</html>
```

Note how Flask uses Jinja templates, which lets us mix some Python-like functionality into our frontend, using tags such as `{% for task in tasks %}`. Our main loop goes through all the existing tasks and displays them. It adds update and delete buttons referencing each `task.id` so that these can be passed to the backend and our server-side code can perform the necessary operations on our database.

In `login.html` add:

```html
<!doctype html>
<html lang="en" >
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
     <link rel="stylesheet" href="/static/style.css">
        <script  type = "text/javascript">
      function redirect(link) {
        window.location.href = link;
     }
    </script>
    <title>shared tasks app</title>
  </head>
  <body>
      	<h1>Hello! Please log in.</h1>
        <div>
          <script authed="location.reload()" src="https://auth.turbio.repl.co/script.js"></script>
  	    </div>
      </main>
  </body>
</html>
```

And in `unauthorized.html` add:

```html
<h1>Unauthorized</h1>

<p>You signed in, but you're not authorized to access this page</p>
```

Note how we pull in the pico.css CSS framework in our template files. This means that the application already looks better than using plain HTML, but we'll add few lines of custom CSS to tweak the look a bit further.

Create a new folder called `static` and add a file inside it called `style.css`.

Add the following code to this new file:

```css
@media only screen and (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --primary: #ffb300;
    --primary-hover: #ffc107;
    --primary-focus: rgba(255, 179, 0, 0.25);
    --primary-inverse: rgba(0, 0, 0, 0.75);
  }
}

header {
  color: white;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0
      #000;
  background: #ffb300;
}
.task {
  display: inline-flex;
  padding: 10px;
}

.update-btn {
  padding-left: 5px;
}

.task-input {
  width: 600px;
  display: inline-flex;
}
```

This will put the controls all on the same line as each task, and make the header bigger.

## Finishing touches

Your application should function at this point. Note that login with Replit doesn't always work as expected in a browser embedded in your IDE, so rather use the application in a dedicated tab.

To ensure that your team can always access your internal application, enable "Always On" mode by clicking on your repl's name and toggling the switch.

![enable always on](https://docimg.replit.com/images/teamsPro/internal-tools-flask-sqlite/always-on.png)

## Where next?

Nearly all applications are built on the four basic CRUD operations, so you can build any app you can imagine. If you hit the limits of Flask, you might also want to consider moving over to Django, a more "batteries included" web framework that comes with many additional features out the box.

You can find a repl with all of the code shown above at [https://replit.com/@ritza/internal-tools-flask-pico](https://replit.com/@ritza/internal-tools-flask-pico). Feel free to fork it over to your account and adapt it to your needs.
