---
title: Stock market dashboard
---

# How to Build a Personal Stock Market Dashboard

In this tutorial, we will be building a single-page web dashboard for tracking a real or imaginary stock portfolio. This dashboard will:

- Allow the user to record stock purchases.
- Track the current price of all stocks held through web scraping.
- Show the user the percentage gain or loss on their holdings, for each stock and in total.

![Dashboard functionality](https://docimg.replit.com/images/tutorials/22-stock-market/dashboard_functionality.png)

After working through this tutorial, you'll:

- Be able to build a single-page application with Flask and JavaScript.
- Understand web scraping with `Requests` and `Beautiful Soup`.
- Know how to manage persistent data with Replit's database.

## Creating the Dashboard

We're going to build our dashboard using Python (plus a bit of JavaScript). Sign in to [Replit](https://replit.com) or [create an account](https://replit.com/signup) if you haven't already. Once logged in, create a new Python repl.

![Creating a Python repl](https://docimg.replit.com/images/tutorials/22-stock-market/create-python-repl.png)

Our dashboard will need to have three functions:

- Displaying the current state of the stock portfolio.
- Recording share purchases.
- Flushing the database (this will be useful for testing).

Let's start by creating an HTML frontend with the basic data and form elements necessary to enable this functionality. In your repl's file pane, create a directory named `templates`, and in that folder, create a file called `index.html` (this file structure is necessary for building Flask applications).

![Creating the file structure](https://docimg.replit.com/images/tutorials/22-stock-market/create-files.png)

Then enter the following HTML into the `index.html` file:

```html
<!DOCTYPE html>
<html>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    crossorigin="anonymous"
  />
  <style>
    .positive:before {
      content: "+";
      color: green;
    }
    .positive {
      color: green;
    }
    .negative {
      color: red;
    }
    th,
    td {
      padding: 1em;
    }
    body {
      margin: 2em auto;
      max-width: 80em;
    }
  </style>
  <body>
    <form action="/buy" method="post">
      <input type="text" placeholder="ticker" name="ticker" />
      <input type="text" placeholder="# shares" name="shares" />
      <input type="text" placeholder="price" name="price" />
      <input type="submit" value="Buy" />
    </form>

    <table id="portfolio">
      <tr>
        <th>Ticker</th>
        <th>Number of shares</th>
        <th>Total cost</th>
        <th>Current value</th>
        <th>Percent change</th>
      </tr>
      <tr>
        <td>Loading...</td>
      </tr>

      <tr></tr>
    </table>

    <a href="/flush">Flush DB</a>
  </body>
</html>
```

In this file, we've imported [Bootstrap CSS](https://getbootstrap.com/) and applied some minimal styles of our own to make the default content look a little better. We've also created a form for recording share purchases, and a table that will display our share portfolio.

Now let's write some Python code so we can display this page in our Flask app. Enter the following code in `main.py`:

```python
from flask import Flask, render_template, request, jsonify, url_for, redirect
import json

site = Flask(__name__)

@site.route('/')
def index():
    return render_template('index.html')

site.run(host='0.0.0.0', port=8080)
```

Now run your repl. The resulting page should look like this:

![Initial dashboard](https://docimg.replit.com/images/tutorials/22-stock-market/initial-dashboard.png)

The first thing we need to implement to get this page functional is the share purchase form. Let's do that now.

## Accessing the Database and Recording Purchases

We can allow users to "buy" stock by entering the [ticker symbol](https://en.wikipedia.org/wiki/Ticker_symbol), the number of shares purchased, and the price per share. While it would also make sense to record the purchase time, we will leave that out for the sake of simplicity (but you can add it later on your own).

We will record these purchases by adding them to the [Replit database](/hosting/databases/replit-database). This is a simple key-value store that you can think of as a big Python dictionary which retains its state between runs of a repl. Using this database will save us from having to re-enter all of our stock information every time we restart our dashboard.

To use the Replit Database, all we have to do is add the following import statement at the top of `main.py`:

```python
from replit import db
```

Now we can use the globally scoped variable `db` like a Python dictionary, keeping in mind that whatever we store in it will persist between executions of our application. A cheat sheet for using the database is available from your repl's database tab on the sidebar.

![Database sidebar](https://docimg.replit.com/images/tutorials/22-stock-market/database-sidebar.png)

Let's give it a spin and write the function for buying shares. Add the following code just above the line beginning with `site.run`:

```python
@site.route('/buy', methods=['POST'])
def buy():
    # Create shares key if it doesn't exist
    if 'shares' not in db.keys():
        db['shares'] = {}

    # Extract values from form
    ticker = request.form['ticker'][:5].upper()
    price = float(request.form['price'])
    shares = int(request.form['shares'])

    if ticker not in db['shares']: # buying these for the first time
        db['shares'][ticker] = { 'total_shares': shares,
                                 'total_cost': shares * price }

        db['shares'][ticker]['purchases'] = [{ 'shares': shares,
                                'price': price }]
    else: # buying more
        db['shares'][ticker]['total_shares'] += shares
        db['shares'][ticker]['total_cost'] += shares * price
        db['shares'][ticker]['purchases'].append({ 'shares': shares,
                                        'price': price})

    return redirect(url_for("index"))
```

First, if necessary, we create an empty dictionary at the "shares" key of our `db` database. This code will only need to run the first time we buy shares.

Then, we extract the ticker, price and number of shares from the form data, coercing each one into an appropriate format. We want stock tickers to be uppercase and [a maximum of five characters long](https://www.investopedia.com/terms/s/stocksymbol.asp), prices to include fractional amounts, and number of shares to be integers (though you could change that later to support [fractional shares](https://www.investopedia.com/terms/f/fractionalshare.asp)).

Finally, we add our share purchase to the "shares" dictionary. This dictionary is made up of ticker symbol keys mapped to inner dictionaries, which in turn contain the following information:

- The total number of shares owned.
- The total cost of all shares purchased.
- A list of individual purchases. Each purchase is a dictionary containing the number of shares purchased, and their unit price.

This may seem like a complicated structure, but it is necessary to allow users to buy shares in the same company at different prices. With some data added, our dictionary could look like this:

```json
{
  "AAPL": {
    "total_shares": 15,
    "total_cost": 1550,
    "purchases": [
      {
        "shares": 10,
        "price": 100
      },
      {
        "shares": 5,
        "price": 110
      }
    ]
  },
  "MSFT": {
    "total_shares": 20,
    "total_cost": 4000,
    "purchases": [
      {
        "shares": 20,
        "price": 200
      }
    ]
  }
}
```

In the data above, we've bought 10 shares of Apple Inc (AAPL) at $100 per share, and 5 at $110 per share. We've also bought 20 shares of Microsoft Corporation (MSFT) at $200 per share. The `total_shares` and `total_cost` values could be derived from the list of purchases, but we're storing them in the database to avoid having to recalculate them unnecessarily.

Run your code now, and add a few stocks with random values. You can use some example tickers: AAPL, MSFT, AMZN, FB, GOOG. While our purchases won't show up on our dashboard, you can determine whether they're getting added to the database by visiting the database tab on your repl's sidebar. If your code is correct, you should see non-zero values under the "STORAGE" heading.

At the moment, our dashboard will also allow you to add any value as a ticker symbol, even if it's not a real public company. And, needless to say, our dashboard also doesn't show us the current value of our stocks. We'll fix those issues soon, but first we need to implement some functionality to help us test.

## Flushing the Database

A persistent database is vital for creating most useful web applications, but it can get messy in the early stages of development when we're adding a lot of different test data and experimenting with different structures. That's why it's useful to have a quick and easy way to delete everything.

We've already included a link to flush the database in our `index.html` file, so now let's create the backend functionality in Flask. Add this code to `main.py`, below the `buy` function:

```python
@site.route('/flush')
def flush_db():
    del db["shares"]
    return redirect(url_for("index"))
```

Here we're deleting the `shares` key from our database and then redirecting the user to the dashboard. As `shares` is the only key in our database, this code will suffice for now, but if we add more keys, we'll have to change it accordingly.

Test this new functionality out by flushing your database before moving on to the next section, especially if you have invalid stock tickers. You can confirm whether the flush worked by checking the database tab of your repl's sidebar, where the values under "STORAGE" should now be zero. Note that deletion may take a few seconds to reflect.

## Serving Our Portfolio Data

We want our dashboard to be a live display that fetches new stock prices periodically, without us having to refresh the page. It would also be nice to unload calculations such as percentage gain or loss to the client's web browser, so we can reduce load on our server. To this end, we will be structuring our portfolio viewing functionality as an API endpoint that is queried by JavaScript code, rather than using Jinja templates to build it on the server-side.

The first thing we must do to achieve this is to create a Flask endpoint that returns the user's portfolio. We'll do this at `/portfolio`. Add the following code to `main.py`, below the `buy` function:

```python
@site.route('/portfolio')
def portfolio():
    if "shares" not in db.keys():
        return jsonify({})

    portfolio = json.loads(db.get_raw("shares"))

    # Get current values
    for ticker in portfolio.keys():
        current_price = float(get_price(ticker))
        current_value = current_price * portfolio[ticker]['total_shares']
        portfolio[ticker]['current_value'] = current_value

    return jsonify(**portfolio)
```

The purpose of this function is to serve a [JSON object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) of the shares portfolio to the client. Later, we'll write JavaScript for our dashboard which will use this object to construct a table showing our portfolio information.

In the above code, if no stocks have been added, we return an empty JSON object. Otherwise, we set `portfolio` to a copy of the `shares` dictionary in our Replit database. The Python Replit library uses custom list and dictionary types that cannot be directly serialized into JSON, so we use [`db.get_raw`](https://replit-py.readthedocs.io/en/latest/db_tutorial.html#advanced-usage) to convert the whole thing into a string and `json.loads` to convert that string into a standard Python dictionary.

Then we need to get the current values for each of our stock holdings. To do so, we loop through `portfolio.keys()`, call `get_price(ticker)` and multiply the return value by the total shares we're holding for this stock. We then add this value under the new `current_value` key in our stock's dictionary.

Finally, we convert our portfolio dictionary to JSON using Flask's [`jsonify`](https://flask.palletsprojects.com/en/2.0.x/api/#module-flask.json) and return it.

There's just one problem: we haven't implemented `get_price` yet! Let's do that now, before we try to run this code.

## Fetching Current Prices

We'll fetch the current prices of our stocks by [scraping](https://en.wikipedia.org/wiki/Web_scraping) the [Yahoo Finance](https://finance.yahoo.com/) website. While the more traditional and foolproof way of consuming structured data such as share prices is to use an [API](https://en.wikipedia.org/wiki/API) that provides structured data in a computer-ready format, this is not always feasible, as the relevant APIs may be limited or even non-existent. For these and other reasons, web scraping is a useful skill to have.

**A quick disclaimer before we jump in:** Copyright law and web scraping laws are complex and differ by country. As long as you aren't blatantly copying their content or doing web scraping for commercial gain, people generally don't mind web scraping. However, there have been some legal cases involving scraping data from LinkedIn, and media attention from scraping data from OKCupid. Web scraping can violate the law, go against a particular website's terms of service, or breach ethical guidelines – so take care with where you apply this skill.

Additionally, from a practical perspective, web scraping code is usually brittle and likely to break in the event that a scraped site changes its appearance.

With those considerations in mind, let's start scraping. We'll use [Python Requests](https://docs.python-requests.org/en/master/) to fetch web pages and [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) to parse them and extract the parts we're interested in. Let's import those at the top of `main.py`.

```python
from bs4 import BeautifulSoup
import requests
```

Now we can create our `get_price` function. Enter the following code near the top of `main.py`, just below `site = Flask(__name__)`:

```python
def get_price(ticker):
    page = requests.get("https://finance.yahoo.com/quote/" + ticker)
    soup = BeautifulSoup(page.text, "html5lib")

    price = soup.find('fin-streamer', {'class':'Fw(b) Fz(36px) Mb(-4px) D(ib)'}).text

    # remove thousands separator
    price = price.replace(",", "")

    return price
```

The first line fetches the page on Yahoo Finance that shows information about our stock share price. For example, the link below will show share price information for Apple Inc:

[https://finance.yahoo.com/quote/AAPL](https://finance.yahoo.com/quote/AAPL)

We then load the page into a Beautiful Soup object, parsing it as HTML5 content. Finally, we need to find the price. If you visit the above page in your browser, right-click on the price near the top of the page and select "Inspect". You'll notice that it's inside a `fin-streamer` element with a class value containing `Fw(b) Fz(36px) Mb(-4px) D(ib)`. If the market is open, and the price is changing, additional classes may be added and removed as you watch, but the previously mentioned value should still be sufficient.

We use Beautiful Soup's [`find`](<https://www.crummy.com/software/BeautifulSoup/bs3/documentation.html#find(name,%20attrs,%20recursive,%20text,%20**kwargs)>) method to locate this `fin-streamer`. The `text` attribute of the object returned is the price we want. Before returning it, we remove any comma thousands separators to avoid float conversion errors later on.

Although we've implemented this functionality for the sake of portfolio viewing, we can also use it to improve our share buying process. We'll make a few additional quality-of-life changes at the same time. Find your `buy` function code and modify it to look like this:

```python
@site.route('/buy', methods=['POST'])
def buy():
    # Create shares key if it doesn't exist
    if 'shares' not in db.keys():
        db['shares'] = {}

    ticker = request.form['ticker']

    # remove starting $
    if ticker[0] == '$':
        ticker = ticker[1:]

    # uppercase and maximum five characters
    ticker = ticker.upper()[:5]

    current_price = get_price(ticker)
    if not get_price(ticker): # reject invalid tickers
        return f"Ticker $'{ticker}' not found"

    if not request.form['price']: # use current price if price not specified
        price = float(current_price)
    else:
        price = float(request.form['price'])

    if not request.form['shares']: # buy one if number not specified
        shares = 1
    else:
        shares = int(request.form['shares'])

    if ticker not in db['shares']: # buying these for the first time
        db['shares'][ticker] = { 'total_shares': shares,
                                 'total_cost': shares * price }

        db['shares'][ticker]['purchases'] = [{ 'shares': shares,
                                'price': price }]
    else: # buying more
        db['shares'][ticker]['total_shares'] += shares
        db['shares'][ticker]['total_cost'] += shares * price
        db['shares'][ticker]['purchases'].append({ 'shares': shares,
                                        'price': price})

    return redirect(url_for("index"))
```

The first change we've made to this function is to strip leading `$`s on ticker symbols, in case users include those. Then, by calling `get_price` in this function, we can both prevent users from adding invalid stock tickers and allow users to record purchases at the current price by leaving the price field blank. Additionally, we'll assume users want to buy just one share if they leave the number of shares field blank.

We can now test out our code. Run your repl, add some stocks, and then, in a separate tab, navigate to this URL (replacing the two ALL-CAPS values first):

```
https://YOUR-REPL-NAME--YOUR-USERNAME.repl.co/portfolio
```

_Note: Please refer to [these docs](/hosting/hosting-web-pages.md#end-of-dot-style-domains) to ensure that you are using the correct repl.co domain format._

You should now see a JSON object similar to the database structure detailed above, with the current value of each stock holding as an additional field. In the next section, we'll display this data on our dashboard.

## Showing Our Portfolio

We will need to write some JavaScript to fetch our portfolio information, assemble it into a table, and calculate the percentage changes for each stock as well as our portfolio's total cost, current value and percentage change.

Add the following code just above the closing `</body>` tag in `templates/index.html`:

```html
<script>
  function getPortfolio() {
    fetch("/portfolio")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  getPortfolio();
</script>
```

This code uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to query our `/portfolio` endpoint and returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which we feed into two [`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) methods. The first one extracts the JSON data from the response, and the second one logs the data to JavaScript console. This is a common pattern in JavaScript, which provides a lot of [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts) functionality.

Run your repl and open its web page in a new tab.

![Opn in new tab](https://docimg.replit.com/images/tutorials/22-stock-market/replit-browser-open-in-new-tab.png)

Then open your browser's devtools with F12, and you should see your portfolio JSON object in the console. If you don't, give it a few seconds.

![In browser console](https://docimg.replit.com/images/tutorials/22-stock-market/json-portfolio-in-browser-console.png)

Now let's add the rest of our JavaScript code. Delete `console.log(data);` and add the following code in its place:

```javascript
var table = document.getElementById("portfolio");
var tableHTML = `<tr>
    <th>Ticker</th>
    <th>Number of shares</th>
    <th>Total cost</th>
    <th>Current value</th>
    <th>Percent change</th>
</tr>`;

var portfolioCost = 0;
var portfolioCurrent = 0;

for (var ticker in data) {
  var totalShares = data[ticker]["total_shares"];
  var totalCost = data[ticker]["total_cost"];
  var currentValue = data[ticker]["current_value"];
  var percentChange = percentChangeCalc(totalCost, currentValue);

  row = "<tr>";
  row += "<td>$" + ticker + "</td>";
  row += "<td>" + totalShares + "</td>";
  row += "<td>$" + totalCost.toFixed(2) + "</td>";
  row += "<td>$" + currentValue.toFixed(2) + "</td>";
  row += percentChangeRow(percentChange);
  row += "</tr>";
  tableHTML += row;

  portfolioCost += totalCost;
  portfolioCurrent += currentValue;
}

portfolioPercentChange = percentChangeCalc(portfolioCost, portfolioCurrent);

tableHTML += "<tr>";
tableHTML += "<th>Total</th>";
tableHTML += "<th>&nbsp;</th>";
tableHTML += "<th>$" + portfolioCost.toFixed(2) + "</th>";
tableHTML += "<th>$" + portfolioCurrent.toFixed(2) + "</th>";
tableHTML += percentChangeRow(portfolioPercentChange);
tableHTML += "</tr>";

table.innerHTML = tableHTML;
```

This code constructs an [HTML table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) containing the values queried from our portfolio endpoint, as well as the extra calculated values we mentioned above. We use the [`toFixed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) method to cap the number of decimal places for financial values to two.

We also use a couple of helper functions for calculating and displaying percentage changes. Add the code for these above the `getPortfolio` function declaration:

```javascript
function percentChangeCalc(x, y) {
  return x != 0 ? ((y - x) * 100) / x : 0;
}

function percentChangeRow(percentChange) {
  if (percentChange > 0) {
    return "<td class='positive'>" + percentChange.toFixed(2) + "%</td>";
  } else if (percentChange < 0) {
    return "<td class='negative'>" + percentChange.toFixed(2) + "%</td>";
  } else {
    return "<td>" + percentChange.toFixed(2) + "%</td>";
  }
}
```

The `percentChangeCalc` function calculates the percentage difference between two numbers, avoiding division by zero. The `percentChangeRow` function allows us to style gains and losses differently by adding classes that we've already declared in the page's CSS.

Finally, we need to add some code to periodically refetch our portfolio, so that we can see the newest price data. We'll use JavaScript's [`setInterval`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#setinterval) function for this. Add the following code just above the closing `</script>` tag.

```javascript
// refresh portfolio every 60 seconds
setInterval(function () {
  getPortfolio();
}, 60000);
```

Run your repl, add some stocks if you haven't, and you should see something like this:

![Dashboard with portfolio](https://docimg.replit.com/images/tutorials/22-stock-market/dashboard-with-portfolio.png)

From this point on, we highly recommend viewing your application in a new browser tab rather than Replit's in-page browser, to get the full-page dashboard experience.

## Caching

Our dashboard is feature-complete, but a bit slow. As we're rendering it with client-side JavaScript that has to execute in the user's browser, we won't be able to make it load instantly with the rest of the page, but we can do some server-side caching to speed it up a little and reduce the load on our repl.

Currently, whenever we send a request to the `/portfolio` endpoint, we execute `get_price` on each of our stocks and rescrape Yahoo Finance to find their prices. Under normal conditions, stock prices are unlikely to change significantly moment-to-moment, and our dashboard is not a [high-frequency trading](https://www.investopedia.com/ask/answers/09/high-frequency-trading.asp) platform, so we should write some logic to store the current share price and only renew it if it's more than 60 seconds old. Let's do this now.

As we're going to be modifying the database structure in this section, it's a good idea to flush your repl's database before going any further, so as to avoid errors.

First, we'll import the `time` module, near the top of `main.py`.

```python
import time
```

This allows us to use `time.time()`, which returns the current [Unix Epoch](https://www.epochconverter.com/), a useful value for counting elapsed time in seconds. Add the following code to the `buy` function, just above the `return` statement:

```python
    db['shares'][ticker]['current_price'] = current_price
    db['shares'][ticker]['last_updated'] = time.time()
```

This code will add the current share price for each ticker and when it was last updated to our database.

Now we need to modify the `get_price` function to resemble the code below:

```python
def get_price(ticker):

    # use cache if price is not stale
    if ticker in db["shares"].keys() and time.time() < db["shares"][ticker]["last_updated"]+60:
        return db["shares"][ticker]["current_price"]

    page = requests.get("https://finance.yahoo.com/quote/" + ticker)
    soup = BeautifulSoup(page.text, "html5lib")

    price = soup.find('fin-streamer', {'class':'Fw(b) Fz(36px) Mb(-4px) D(ib)'}).text

    # remove thousands separator
    price = price.replace(",", "")

    # update price in db
    if ticker in db["shares"].keys():
        db["shares"][ticker]["current_price"] = price
        db["shares"][ticker]["last_updated"] = time.time()

    return price
```

The _if_ statement at the top will cause the function to return the current price recorded in our database if it has been fetched recently, and the two new lines near the bottom of the function will ensure that when a new price is fetched, it gets recorded in the database, along with an updated timestamp.

You can play around with different caching time periods in this function and different refresh intervals in the JavaScript code to find the right tradeoff between accurate prices and fast load times.

## Where Next?

Our stock dashboard is functional, and even useful to an extent, but there's still a lot more we could do with it. The following features would be good additions:

- Support for fractional shares.
- The ability to record the sale of shares.
- Timestamps for purchase (and sale) records.
- Support for cryptocurrencies, perhaps using data from [CoinMarketCap](https://coinmarketcap.com/).
- The ability to create multiple portfolios or user accounts.
- Graphs.

You can find the code for this tutorial in the repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/personal-finance-dashboard?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
