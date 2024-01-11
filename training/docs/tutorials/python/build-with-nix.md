# Building with Nix on Replit

As of May 2021, Replit [supports all programming languages through the power of Nix](https://blog.replit.com/nix). But Nix can do a whole lot more than just enable us to use new languages. In this article, we'll cover several different use-cases for Nix on Replit, including:

- Setting up a production-grade web stack, with a database and support for multiple web servers.
- Running third-party programs in Replit.
- Playing DOOM in a repl.

### What is Nix?

Nix is a tool designed for managing packages and system configurations. It has some similarities to package managers you may have used in the past, such as Homebrew on macOS, APT on Debian-based Linux distributions, Python's pip, or Node.js's NPM. If you haven't used a package manager before, it's basically an app store.

When you install a package with a traditional package manager – say you want to install a browser like Firefox – it will download some files, unpack them in various places on your system, and run some configuration scripts. It will also install all of the additional programs and libraries Firefox needs to run. Many of these will have dependencies themselves, and so it will install those too. Ultimately, installing a single package can require many more installations and result in widespread changes to your system.

Sometimes, packages will be incompatible with each other, due to relying on different versions of the same dependency. For example, App #1 depends on `libxyz 1.4` and App #2 depends on `libxyz 1.5`. Installing App #2 upgrades `libxyz` and breaks App #1. Downgrading `libxyz` fixes App #1 but breaks App #2.

This is called [dependency hell](https://en.wikipedia.org/wiki/Dependency_hell), and it's one of the problems Nix was designed to solve. Whereas a standard package manager might install [Vim](https://www.vim.org/) to `/usr/bin/vim`, nix will install it to a directory that looks like this:

```
/nix/store/<hash>-vim-<version>
```

The directory name has three components: the package name, the version, and a hash of all the package information, such as configuration options. Two packages on two different systems with the same hash will be identical, but two packages with the same name and version but different hashes will have slight differences. Because of this, we can install multiple versions of the same package, neatly solving our App #1 and App #2 dependency hell.

Whereas a package manager like APT might scatter the contents of an installed program across `/bin`, `/etc`, `/usr`, and other directories that require special privileges to write to, Nix keeps everything in `/nix/store`. This lets us securely install packages as a non-privileged user.

Packages in Nix are built using _derivations_, which you can think of as build scripts. All derivations are written in the Nix language, a functional programming language, similar to Haskell or F#. If you haven't used a functional language before, the most fundamental thing to understand is that there isn't any persistent state, i.e. you can't define variables outside of functions. Functional languages are composed of functions that take some input and produce some output. Every time a function is executed with a given input, it will return the same output. This requires a different approach to traditional imperative programming languages but enhances predictability and reproducibility of output, two very good qualities for a build system.

To learn more about Nix, check out the following resources:

- [Nix Pills](https://nixos.org/guides/nix-pills/): A guided introduction to Nix, split into self-contained chapters, or "pills".
- [Nixology](https://www.youtube.com/playlist?list=PLRGI9KQ3_HP_OFRG6R-p4iFgMSK1t5BHs): A series of videos introducing Nix.
- [Nix Package Manager Guide](https://nixos.org/manual/nix/stable/): The official Nix Package Manager manual.
- [A tour of Nix](https://nixcloud.io/tour): An overview of the Nix language.
- [nix.dev](https://nix.dev): Getting started tutorials

### How can we use Nix on Replit?

Every repl you create is backed by a [Docker](https://www.docker.com/) container. Anything you do from your repl, from running code to executing commands in the shell, will happen in the context of the `runner` user in this container. For reasons of security, this user does not have root privileges, and therefore cannot install packages using a traditional package manager like APT. But the `runner` in a Nix repl can install packages with Nix.

This opens up an enormous array of possibilities. In previous tutorials, we've focused on using repls to run custom code in various languages. The Replit Database makes it possible to create applications with persistent storage, but Nix allows us to use a standard DBMS like MySQL or Postgres. We can also install webservers and even graphical programs like Inkscape and LibreOffice.

Essentially, Nix turns our repl into a fully fledged server. In the next few sections, we'll cover some of the things we can do as a result.

## Deploying a production web stack on Replit with Nix

The first thing we'll build with Nix is a production web stack with the following components:

- Python Flask as the application server.
- Waitress as the [Web Server Gateway Interface](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface).
- NGINX as the web server.
- Postgres as the SQL database.

### Why Waitress?

If you've built anything with Python and Flask, such as one of our previous tutorials, you will have used Flask's development server to interact with your application. While this server is great for development and debugging, it's optimised for a single user and gets quite slow if more than one person tries to use it.

![Flask development server](https://docimg.replit.com/images/tutorials/30-build-with-nix/dev-server.png)

We can improve the speed of our Flask apps by using a production-grade [WSGI](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface) server in place of Flask's default, such as [Gunicorn](https://gunicorn.org/) or [Waitress](https://pypi.org/project/waitress/).

### Why NGINX?

What if we want to host more than just a Flask app? Let's consider an e-commerce site at `www.example.com`. The main store application is powered by Flask, but our marketing department would like to start a blog at `www.example.com/blog`. We could build blogging functionality into our e-commerce site, but it would be much quicker and easier to use a separate application, such as [Wordpress](https://wordpress.org/) or [Ghost](https://ghost.org/).

This is where a fully featured web server, such as NGINX or Apache, comes in. These web servers can be configured to serve several different applications and content directories at different locations on one or more domains. They're also much faster at serving static content than even a production-grade WSGI server, so even single-app deployments benefit from using them.

### Why Postgres?

We've used Replit's Database for persistent storage in several previous tutorials. While it's easy to use in supported languages like Python, it doesn't have the power and flexibility of a mainstream SQL database, and we can't continue using it if we ever move our code out of Replit. Postgres is a popular SQL database used by many, from small startups to tech giants like Apple, Reddit and Spotify. We can use it too if we install it on Nix.

### Repl overview

We've made a Nix repl containing the production web stack available here: [https://replit.com/@ritza/nix-template](https://replit.com/@ritza/nix-template)

Open it now, or fork it to your profile, and we'll go over how it works. Ensure that the repl's config files are showing.

![Show configuration](https://docimg.replit.com/images/tutorials/30-build-with-nix/
show-hidden-files.png)

The first file we'll look at is `replit.nix`. This is the base Nix file that tells our repl what packages to install. In the [default Nix repl](https://replit.com/@ritza/nix), it looks like this:

```nix
{ pkgs }: {
    deps = [
        pkgs.cowsay
    ];
}

```

The first line, `{ pkgs }:`, defines an anonymous function that takes a single argument, `pkgs`. When we run our repl, this function will be called and its contents executed. In this case, its contents is a list of packages to install, one item long. Therefore, all this function does is install `cowsay`, a program that prints an ASCII cow.

![Cowsay](https://docimg.replit.com/images/tutorials/30-build-with-nix/cowsay.png)

By contrast, the `replit.nix` file in our production web stack repl is more complicated. It looks like this:

```nix
{ pkgs }:
let

    nginxModified = pkgs.nginx.overrideAttrs (oldAttrs: rec {
        configureFlags = oldAttrs.configureFlags ++ [
            "--http-client-body-temp-path=/home/runner/REPL-NAME-HERE/cache/client_body"
            "--http-proxy-temp-path=/home/runner/REPL-NAME-HERE/cache/proxy"
            "--http-fastcgi-temp-path=/home/runner/REPL-NAME-HERE/cache/fastcgi"
            "--http-uwsgi-temp-path=/home/runner/REPL-NAME-HERE/cache/uwsgi"
            "--http-scgi-temp-path=/home/runner/REPL-NAME-HERE/cache/scgi"
         ];
    });

in {
    deps = [
        nginxModified
        pkgs.python39
        pkgs.python39Packages.flask
        pkgs.python39Packages.waitress
        pkgs.postgresql
        pkgs.python39Packages.psycopg2
    ];

}
```

You should recognise some similarities between this code and the default `replit.nix`. We're still defining an anonymous function that takes `pkgs`, but now we're installing more than one package.

All of the packages in `deps` are straight from Nix's package repository, except for `nginxModified`. We need to make some modifications to `nginx` to get it to run in our repl. Nix's language and system configuration abilities make this much simpler to do than if we were using a different package manager that didn't support recompiling packages.

Nix's `let ... in { ... }` control structure is used when we want to define local variables used in a given function. We define the variables after `let` and then use them after `in`. Let's take a closer look at the definition of `nginxModified`:

```nix
    nginxModified = pkgs.nginx.overrideAttrs (oldAttrs: rec {
        configureFlags = oldAttrs.configureFlags ++ [
            "--http-client-body-temp-path=/home/runner/REPL-NAME-HERE/cache/client_body"
            "--http-proxy-temp-path=/home/runner/REPL-NAME-HERE/cache/proxy"
            "--http-fastcgi-temp-path=/home/runner/REPL-NAME-HERE/cache/fastcgi"
            "--http-uwsgi-temp-path=/home/runner/REPL-NAME-HERE/cache/uwsgi"
            "--http-scgi-temp-path=/home/runner/REPL-NAME-HERE/cache/scgi"
         ];
    });
```

Here we're taking `pkgs.nginx` and calling [`overrideAttrs`](https://nixos.org/manual/nixpkgs/stable/#sec-pkg-overrideAttrs) to change the configuration flags that are set when compiling NGINX. We need to add a few flags that change the paths NGINX uses to paths that are accessible in our repl. Note that we've created all the directories in the expected locations.

[The derivation that runs when we install `pkgs.nginx` can be found here](https://github.com/NixOS/nixpkgs/blob/master/pkgs/servers/http/nginx/generic.nix). Our version will do the same things, but with a few extra items in `configureFlags`.

That's it for `replit.nix`. Now let's take a look at `.replit`. This file defines what command will get executed when we click the "Run" button, and what custom environment variables will be available to our repl.

```bash
run = "sh start.sh"

[env]
PGDATA = "/home/runner/${REPL_SLUG}/data"
```

We'll execute the shell script `start.sh` when we press "Run", and we have defined `PGDATA`, an environment variable Postgres uses to locate its data directory. Let's look at `start.sh` next:

```sh
# start Postgres
pg_ctl stop

initdb
cp postgresql.conf.tpl data/postgresql.conf

socker_dir="\/home\/runner\/${REPL_SLUG}\/postgres"

sed -i "s/replace_unix_dir/${socker_dir}/" data/postgresql.conf

pg_ctl -l /home/runner/${REPL_SLUG}/postgresql.log start

createdb -h 127.0.0.1
psql -h 127.0.0.1 -c "create database appdb;"

# start nginx
pkill nginx

nginx -e /home/runner/$REPL_SLUG/logs/error.log -c /home/runner/$REPL_SLUG/nginx.conf

# start Flask app
python main.py
```

In order, we start Postgres, then NGINX, and then our Python Flask application.

Our Postgres code first stops any existing instances of Postgres, then calls `initdb`, which will create a new database at the directory specified in `$PGDATA` if none exists. We then copy our Postgres configuration file into our data directory and use `sed` to fill in its `unix_socket_directories` value, another directory we need to change to get things working in a repl.

The file `postgressql.conf.tpl` is long and mostly unimportant. The only part of that file that will be relevant for basic use is the following lines under the heading "Connection Settings":

```
# - Connection Settings -

listen_addresses = '127.0.0.1'      # what IP address(es) to listen on;
                    # comma-separated list of addresses;
                    # defaults to 'localhost'; use '*' for all
                    # (change requires restart)
port = 5432             # (change requires restart)
```

These lines set the database to listen on the [local loopback](https://en.wikipedia.org/wiki/Localhost#Loopback) on TCP port 5432. This will allow other programs in our repl to connect to it over the network, without having it exposed to the internet or other repls. This is relevant for the next few lines of our script:

```sh
pg_ctl -l /home/runner/${REPL_SLUG}/postgresql.log start

createdb -h 127.0.0.1
psql -h 127.0.0.1 -c "create database appdb;"
```

The first line starts our database, and the last two create a Postgres instance usable by `runner` and within that, a database named `appdb`. Both of these lines will fail on subsequent runs of `start.sh` (if the database has already been created), so we don't need to worry about overwriting our database every time we run our repl.

The code for starting NGINX is simpler:

```sh
# start nginx
pkill nginx

nginx -e /home/runner/$REPL_SLUG/logs/error.log -c /home/runner/$REPL_SLUG/nginx.conf
```

First, we kill any existing `nginx` processes, and then we start NGINX, telling it to write errors to `logs/error.log` and use the configuration file `nginx.conf`. Like `postgresql.conf`, this configuration file is mostly unimportant for basic use. The following changes have been made from Nix's default NGINX configuration file:

1. The option `pid` specifies a repl-accessible PID file location:
   ```
   pid        /home/runner/REPL-NAME-HERE/logs/nginx.pid;
   ```
2. The option `access_log` in the `http` block specifies a repl-accessible access log file location:
   ```
   access_log  /home/runner/REPL-NAME-HERE/logs/access.log;
   ```
3. The `server` block has been changed to host our Python server, as detailed below.

   ```
       server {
           listen       8080;
           server_name  localhost;

           #charset koi8-r;

           #access_log  logs/host.access.log  main;

           location / {
               proxy_pass   http://127.0.0.1:8181;
           }

           #error_page  404              /404.html;

           # redirect server error pages to the static page /50x.html
           #
           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root   html;
           }

       }
   ```

In NGINX, `server` blocks are what you use to set up websites on individual domains. Each domain (e.g. `example.com`) or subdomain (e.g. `blog.example.com`) will have its own server block. To create a `server` block that will define what our repl hosts, we use the following NGINX directives:

```
    listen  8080;
    server_name  localhost;
```

Here we've set NGINX up to run our server on TCP port 8080, as per [Replit's hosting guidelines](/hosting/deployments/about-deployments). Within our `server` block, we can have one or more `location` blocks. These tell NGINX what content to host at different URLs. We can use the `proxy_pass` directive to serve the contents of another webserver running in our repl, or the `root` directive to serve static files. You can learn more about configuring NGINX in the official [NGINX Beginner's Guide](http://nginx.org/en/docs/beginners_guide.html).

The last thing we do in `start.sh` is start up our Python Flask server:

```sh
# start Flask app
python main.py
```

The code for `main.py` should look familiar if you've used Flask before:

```python
from flask import Flask
from waitress import serve
import psycopg2

app = Flask(__name__)

@app.route("/")
def index():

    connection = psycopg2.connect(
        host="127.0.0.1",
        database="appdb")

    cursor = connection.cursor()
    cursor.execute('SELECT version()')
    db_version = cursor.fetchone()
    cursor.close()

    return f"Hello from Python! PostgreSQL database version: {db_version}"

#app.run(host='127.0.0.1', port=8181) # dev server
serve(app, host='127.0.0.1', port=8181, url_scheme='https') # production server
```

In this code, we've created a Flask application that connects to our Postgres database and is served on the local loopback address at TCP port 8181 by the Waitress WSGI server.

If you run the repl now, you'll see a page showing version information about our PostgreSQL database.

From this base, you can build and configure a production-ready web application. Try the following ideas:

- Implement the code from one of our previous Flask-based tutorials, such as [this PDF report generator](/tutorials/python/pdf-report-generator-from-spreadsheet). See if you can adapt the content to use Postgres rather than the Replit Database.
- Implement your own Flask web application, using Postgres as a database.
- Add a second application listening on a different loopback port and available from a different URL. This could be your own Python or Node.js project, or a deployment of open-source software such as Ghost or Wordpress.

## A few other things you can do with Nix and Replit

We started with a complex example to give you an idea of the power and potential of Nix, but there are a few other things you can do with it that don't require the same amount of set up.

### Jupyter Notebook

You can run a [Jupyter Notebook](https://jupyter.org/) in a Nix repl. Add `pkgs.jupyter` to the deps list in `replit.nix`, set `run` in `.replit` to `sh start.sh`, and create a `start.sh` script with the following contents:

```sh
mkdir data
jupyter notebook --ip 0.0.0.0 --port 8080 --notebook-dir /home/runner/$REPL_SLUG/data
```

Notebooks are web-based interactive development environments that allow you to mix runnable code, text notes, mathematical equations, and charts and graphs. They're often used by data scientists.

[https://replit.com/@ritza/nix-jupyter](https://replit.com/@ritza/nix-jupyter)

![Jupyter notebook](https://docimg.replit.com/images/tutorials/30-build-with-nix/jupyter-notebook.png)

### VSCode Server

You can run a Visual Studio Code Server, which will allow you to use a personal, customised version of the popular text editor from anywhere, simply by navigating to your repl's URL.

[https://replit.com/@ritza/nix-vscode-server](https://replit.com/@ritza/nix-vscode-server)

![VS Code server](https://docimg.replit.com/images/tutorials/30-build-with-nix/vscode-server.png)

### Alternative web stacks

Instead of NGINX, you could use [Apache](https://httpd.apache.org/), and instead of Postgres, you could try [MySQL](https://www.mysql.com/) or even a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database like [MongoDB](https://www.mongodb.com/). And of course, you can use just about any mainstream programming language to write your web application code instead of Python, such as JavaScript, Ruby or Java.

### Other programming languages

You can set up and use a programming language that is not officially supported by Replit, such as [Racket](https://racket-lang.org/) (`nixpkgs.racket`), [Prolog](https://www.swi-prolog.org/) (`nixpkgs.swiProlog`), or even [COBOL](https://en.wikipedia.org/wiki/COBOL) (`nixpkgs.gnu-cobol`).

[https://replit.com/@ritza/nix-cobol](https://replit.com/@ritza/nix-cobol)

### DOSBox

We can get the popular MS-DOS emulator [DOSBox](https://www.dosbox.com/) working in a Nix repl by just installing the right package and running it. From there, we can run any DOS program and use it in our repl's VNC window.

[https://replit.com/@ritza/nix-dosbox](https://replit.com/@ritza/nix-dosbox)

Here's DOOM in a repl:

![Doom](https://docimg.replit.com/images/tutorials/30-build-with-nix/doom.png)

Other DOS programs you can try:

- [Liero](https://www.liero.be/), a keyboard-sharing worm fighting game.
- WordStar 4.0, the word processor George RR Martin uses to write the _Game of Thrones_ book series.

## General tips for building with Nix repls

As we've seen above, Nix allows us to use repls for more than just writing and testing code, but some packages require a fair amount of configuration to get working. Here are a few general tips for getting packages working in Nix repls:

- First, search for the package you want on the [Nix package search website](https://search.nixos.org/packages) and add it to `deps` in `replit.nix`. If you don't see any errors in the console after running your repl, it probably worked. Some packages need to be manually started by specifying a run command in `.replit`, while others will start automatically.
- Most of the installation errors you'll encounter will relate to file paths that don't exist in your repl, or that you don't have permission to access. These can generally be fixed if you can configure your package to look for those files in your repl's file list instead, which is hosted on disk at `/home/runner/REPL-NAME-HERE/`. Depending on the package, you may be able to do this with a custom configuration file, like we did with Postgres, or you may need to alter the way Nix installs it, as we did with NGINX.
- You can view files and directories that aren't visible in your repl's filepane from the shell, using standard Unix commands like `ls`, `cd` and `cat`. This includes files and directories in the Nix store, at `/nix/store`. This will often be useful for debugging.
- You can view a list of running processes with the shell command `ps aux`, and terminate them with `pkill <process-name>`.
- Loading the Nix environment will sometimes take a long time, especially if you have custom derivations.
- If you're setting up a web server, refer to [our guidance on deploying HTTP servers](/hosting/deployments/about-deployments).

As a final reminder, make sure to abide by Replit's [Terms of Service](https://replit.com/site/terms) when using Nix repls, and avoid installing packages that use excessive system resources (such as cryptocurrency miners) or are intentionally malicious.
