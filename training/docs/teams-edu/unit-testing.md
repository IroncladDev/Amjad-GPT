---
sidebar_position: 20
---

# Unit testing

Repl unit testing allows a repl author to create code-driven tests that compare actual function output with expected output.

## Supported Languages and Testing Frameworks

- Java – [JUnit](https://junit.org/junit5/docs/current/user-guide/)
- Python – [unittest](https://docs.python.org/3/library/unittest.html)
- Node.js – [Jest](https://jestjs.io/docs/en/getting-started)

## Why Use Unit Testing?

Unit testing is great for more complicated testing scenarios. For example, when you need to test that functions return specific values based on their (dynamic) inputs.

Each test is itself a function that follows a pattern:

- Invoke one function from your application with parameters.
- Compare the return value to an expected value (your function should always have predictable outputs)
- If the actual value does not match the expected value, the assert method with throw an exception and cause the test to fail.

Here's an example using Java:

```
// invoke with 3.0, 4.0 as input
double area = calculateRectArea(3.0, 4.0);
// compare expected to actual
assertEqual(12.0, actual);
```

Unit testing is not ideal for testing that involves using Standard In (`System.in`) and Standard Out (`System.out`). Input/Output testing is ideal for testing that relies on precise usage of `println()`.

## Using the Testing Pane

The testing pane can be found in your left-hand sidebar in your repl. It is your hub for creating tests. Read on to find out more about how to use this helpful feature.

### Defining a test function

Open the testing pane within a project.

![unit testing pane](https://docimg.replit.com/images/unit-testing/unit-testing-pane.png)

If prompted, select "Unit tests".

![](https://docimg.replit.com/images/unit-testing/testing-method.png)

Write a function within the main file that's easy to test: something which accepts parameters and returns a single result. Our example includes an `add` function which simply returns the result of adding two numbers.

In a Python repl:

![unit testing main py](https://docimg.replit.com/images/unit-testing/unit-testing-add-py.png)

In a Node.js repl:

![unit testing index js](https://docimg.replit.com/images/unit-testing/unit-testing-add-js.png)

Click "+ Add test".

![unit testing add test](https://docimg.replit.com/images/unit-testing/unit-testing-add-test.png)

Providing a test will construct a unit test function for you. Only the body of the function is editable. Configure the test to invoke the `add` function and compare the result to the expected value. **If the actual value does not match the expected value, the assert method with throw an exception and cause the test to fail.** Include a helpful failure message to explain the intent of the test.

Note: Python exposes its assert methods on the `self` object. This behavior will be different depending on the language you use. See the "Assertion documentation" below to read about the invocation patterns for each unit testing framework.

In a Python repl:

![unit testing add modal](https://docimg.replit.com/images/unit-testing/unit-testing-add-modal.png)

In a Node.js repl:

![unit testing add modal js](https://docimg.replit.com/images/unit-testing/unit-testing-add-modal-js.png)

Note: by default, in a Node.js repl, the exports are available via an `index` variable, e.g. `index.add` here. You can add your own imports too, see the "Importing Libraries" section.

Click "Run tests" to begin executing your test suite. Open the Console tab to monitor execution progress.

![unit testing running](https://docimg.replit.com/images/unit-testing/unit-testing-running.png)

Test results will appear in the Console.

![unit testing results](https://docimg.replit.com/images/unit-testing/unit-testing-results.png)

### Importing libraries

Imports can be configured in the "Setup" for the test suite, which is helpful if:

- Your repl has library dependencies.
- You would like to include any other library just for testing purposes.

For example, you can import [NumPy](https://numpy.org/) for all tests. Keep in mind that this will affect all test functions within your test suite (you will not need to import more than once):

![unit test setup](https://docimg.replit.com/images/unit-testing/unit-testing-import.png)

Here is an example function using NumPy:

![unit test numpy](https://docimg.replit.com/images/unit-testing/unit-testing-np-example.png)

Every other test you write can also use NumPy:

![unit test numpy](https://docimg.replit.com/images/unit-testing/unit-testing-np-test.png)

### Importing modules

If you would like to test multiple modules or files within your repl, you must manually import them in the "Setup".

![unit test import module](https://docimg.replit.com/images/unit-testing/unit-testing-import-module.png)

## Advanced Setup and Teardown

Sometimes tests require specific setup and teardown steps to configure and destroy global state.

Consider a repl that relies on Repl Database and loads specific data by key.

![unit testing database](https://docimg.replit.com/images/unit-testing/unit-testing-database.png)

### Import

Use import to include Repl Database.

![unit testing db import](https://docimg.replit.com/images/unit-testing/unit-testing-db-import.png)

### Setup

Use the setup to add a database key with test data:

![unit testing setup](https://docimg.replit.com/images/unit-testing/unit-testing-setup.png)

### Teardown

Use the teardown to delete the test data:

![unit testing teardown](https://docimg.replit.com/images/unit-testing/unit-testing-teardown.png)

## Assertion Documentation

Read about the supported assert function for each unit testing library:

- Java – [JUnit](https://junit.org/junit4/javadoc/latest/org/junit/Assert.html)
- Python – [unittest assert methods](https://docs.python.org/3/library/unittest.html#assert-methods)
- Node.js – [Jest expect functions](https://jestjs.io/docs/en/expect)

## Tips for Writing Good Tests

1. Only test one expected output at a time.
2. Avoid relying on external libraries when possible.
3. Avoid testing functions that rely on the entire app running (e.g. databases, network connections, rendering user-interfaces).
4. Avoid testing functions that are not crucial portions of the program.
5. Avoid testing functions that are part of external libraries.

## Tips for Writing "Testable" Functions

1. Decompose your program into discrete functions.
2. Keep functions concise and descriptive.
3. Design predictable inputs (parameters) and outputs (return).

## Teams for Education

Unit testing is supported in [Teams for Education](https://teamsforeducationresources.util.repl.co). If you don't have a team yet, create one [here](https://replit.com/teams).

### Creating a project

If you are new to projects, you can find more info on creating a project [here](/teams-edu/creating-projects-assignments).

<!--
TBD
### Example Team projects

Use project share links below to import a example unit test projects into your team:

  - Java `JUnit`: link
  - Python `unittest`: link
  - Node.js `Jest`: link -->
