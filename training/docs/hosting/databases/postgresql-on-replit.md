---
sidebar_position: 1
---

# PostgreSQL on Replit

## What is PostgreSQL?

PostgreSQL is a powerful, open-source object-relational database system widely used in web applications and other software development projects. We use PostgreSQL version 15 in our integration, allowing you to easily create a production-ready PostgreSQL database directly within Replit. You can run queries and connect to the database using our provided environment variables. For more information on PostgreSQL, visit the [official documentation](https://www.postgresql.org/docs/).

## Why use PostgreSQL?

1. **Simplicity:** With our integration, you can easily set up a PostgreSQL database without having to install any additional software or configure any settings. All you need to do is click a button to have a fully-functional database ready to go.
2. **Seamless integration:** Our integration is designed to work seamlessly with Replit, so you can easily access your database and run queries within the Replit environment or within your code with minimal configuration.
3. **Production-ready:** The database created with our integration is production-ready, so you can use it for real-world applications and projects.
4. **Convenience:** With our provided environment variables, you can easily connect to the database from your code, without having to worry about setting up the connection manually. This saves you time and makes it easier to get your project up and running.
5. **Neon documentation:** Provides guides on how to connect various frameworks, such as Django, to your PostgreSQL database in the [neon documentation](https://neon.tech/docs/connect/connect-from-any-app).
6. **Connection pooling:** If you need to enable connection pooling for any reason, you can contact us, and we'll do it manually. More information on connection pooling can be found in the [neon documentation](https://neon.tech/docs/connect/connection-pooling/).
7. **Compute lifecycle:** The database will sleep after 5 minutes without queries, so you may experience disconnects. More information on the compute lifecycle can be found in the [Neon documentation](https://neon.tech/docs/introduction/compute-lifecycle/)

## Setup

1. Open a new tab in Replit and type "PostgreSQL"
   ![Open a new tab in Replit and type PostgreSQL](https://docimg.replit.com/images/hosting/databases/pgopentab.png)
2. In the "PostgreSQL" panel, click "create a database"
   ![In the PostgreSQL panel, click create a database](https://docimg.replit.com/images/hosting/databases/pgbuy2.png)
3. In the env section, you can view all of the relevant connection information about your database.
   ![You can view all of the relevant connection information about your database.](https://docimg.replit.com/images/hosting/databases/pgvar2.png)

## Billing
Being serverless, Replit PostgreSQL only charges for actual usage, resulting in potential cost savings of up to 10 times.

[Learn more about Replit PostgreSQL usage based billing](/hosting/about-usage-based-billing#1-postgresql-usage-metrics).


## SQL Explorer

We provide a SQL explorer that you can use to create tables and manage your database. And if you have purchased Replit AI, you can use that within the SQL explorer to help you write queries.

## Usage (NodeJS)

### Preparation

<!-- 1. Use the Packager to install `knex` and `pg` -->

1. <span>
     Use the Packager to install <code>knex</code> and <code>pg</code>
   </span>
2. <span>Connect to the DB with Knex using the URL secret</span>

   ```js
   const knex = require("knex")({
     // We are using PostgreSQL
     client: "postgres",
     // Use the `DATABASE_URL` environment variable we provide to connect to the Database
     // It is included in your Replit environment automatically (no need to set it up)
     connection: process.env.DATABASE_URL,

     // Optionally, you can use connection pools to increase query performance
     pool: { min: 0, max: 80 },
   });
   ```

3. <span>
     Use an Async IIFE so we can use <code>await</code>
   </span>

   ```js
   (async () => {
     // Leave this empty for now
   })();
   ```

### Code

1. <span>Create a table</span>

   ```js
   await knex.schema.createTable("users", (table) => {
     table.increments("id");
     table.string("username");
     table.integer("points");
   });
   ```

2. <span>Insert a row</span>

   ```js
   await knex("users").insert({
     username: "alice",
     points: 0,
   });
   ```

3. <span>Update the row</span>

   ```js
   await knex("users")
     .where("username", "alice")
     .update({
       points: knex.raw("points + 1"),
     });
   ```

4. <span>Get the row</span>

   ````js
   const user = await knex('users')
       .where('username', 'alice')
       .first();
       ```
   ````

5. <span>Print the row to the console</span>

   ```js
   console.log(user);
   ```

6. <span>Delete the row</span>

   ```js
   await knex("users").where("username", "alice").delete();
   ```

### Final Code

```js
// Connect to the Database
const knex = require("knex")({
  // We are using PostgreSQL
  client: "postgres",
  // Use the `DATABASE_URL` environment variable we provide to connect to the Database
  // It is included in your Replit environment automatically (no need to set it up)
  connection: process.env.DATABASE_URL,

  // Optionally, you can use connection pools to increase query performance
  pool: { min: 0, max: 80 },
});

(async () => {
  // Create a demo table called "users"
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username");
    table.integer("points");
  });

  // Add a demo user to the table with 0 points
  await knex("users").insert({
    username: "alice",
    points: 0,
  });

  // Increment the points by 1
  await knex("users")
    .where("username", "alice")
    .update({
      points: knex.raw("points + 1"),
    });

  // Get the user
  const user = await knex("users").where("username", "alice").first();

  // Print the user
  console.log(user);

  // Delete the user
  await knex("users").where("username", "alice").delete();
})();
```

## Usage (Python)

### Preparation

1. <span>
     Use the Packager to install <code>psycopg2</code>
   </span>
2. <span>
     Connect to the DB with <code>psycopg2</code> using the URL secret
   </span>

   ```py
   import psycopg2.pool

   # Create a connection pool with a min_size of 0 and a max_size of 80
   # Use the `DATABASE_URL` environment variable we provide to connect to the Database
   # It is included in your Replit environment automatically (no need to set it up)
   pool = psycopg2.pool.SimpleConnectionPool(0, 80, process.env.DATABASE_URL)

   # Get a connection from the pool
   conn = pool.getconn()

   # Create a cursor using the connection
   cur = conn.cursor()

   # Do your database operations using the cursor
   # <Your code goes here>

   # Close the cursor and return the connection to the pool
   cur.close()
   pool.putconn(conn)

   # When you are done using the pool, close it to release the resources
   pool.closeall()
   ```

### Code

1. <span>Create a table</span>

   ```py
   cur.execute(
       """
       CREATE TABLE users (
           id SERIAL PRIMARY KEY,
           username VARCHAR(255),
           points INTEGER
       )
       """
   )
   ```

2. <span>Insert a row</span>

   ```py
   cur.execute(
       """
       INSERT INTO users (username, points)
       VALUES (%s, %s)
       """,
       ('alice', 0)
   )
   ```

3. <span>Update the row</span>

   ```py
   cur.execute(
       """
       UPDATE users
       SET points = points + 1
       WHERE username = %s
       """,
       ('alice',)
   )
   ```

4. <span>Get the row</span>

   ```py
   cur.execute(
       """
       SELECT *
       FROM users
       WHERE username = %s
       """,
       ('alice',)
   )
   user = cur.fetchone()
   ```

5. <span>Print the row to the console</span>

   ```py
   print(user)
   ```

6. <span>Delete the row</span>

   ```py
   cur.execute(
       """
       DELETE FROM users
       WHERE username = %s
       """,
       ('alice',)
   )
   ```

### Final Code

```py
import psycopg2.pool


# Create a connection pool with a min_size of 0 and a max_size of 80
# Use the `DATABASE_URL` environment variable we provide to connect to the Database
# It is included in your Replit environment automatically (no need to set it up)
pool = psycopg2.pool.SimpleConnectionPool(0, 80, process.env.DATABASE_URL)

# Get a connection from the pool
conn = pool.getconn()

# Create a cursor using the connection
cur = conn.cursor()

# Do your database operations using the cursor

# Create a demo table called "users"
cur.execute(
    """
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        points INTEGER
    )
    """
)

# Add a demo user to the table with 0 points
cur.execute(
    """
    INSERT INTO users (username, points)
    VALUES (%s, %s)
    """,
    ('alice', 0)
)

# Increment the points by 1
cur.execute(
    """
    UPDATE users
    SET points = points + 1
    WHERE username = %s
    """,
    ('alice',)
)

# Get the user
cur.execute(
    """
    SELECT *
    FROM users
    WHERE username = %s
    """,
    ('alice',)
)

user = cur.fetchone()

# Print the user
print(user)

# Delete the user
cur.execute(
    """
    DELETE FROM users
    WHERE username = %s
    """,
    ('alice',)
)

# Close the cursor and return the connection to the pool
cur.close()
pool.putconn(conn)

# When you are done using the pool, close it to release the resources
pool.closeall()
```
