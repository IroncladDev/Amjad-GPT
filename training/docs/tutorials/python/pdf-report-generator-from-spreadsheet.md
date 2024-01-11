---
title: PDF report generator from spreadsheet
---

# Generate PDF reports from spreadsheet data

In this tutorial, we'll be building a simple web application that will take in data from spreadsheets and use it to create slick PDF reports. We'll cover the following topics:

- Reading and processing spreadsheet data with Python's [pandas](https://pandas.pydata.org/) library.
- Creating data visualizations with [Matplotlib](https://matplotlib.org/).
- Creating PDFs with Python, using [PyFPDF](https://pyfpdf.readthedocs.io/en/latest/index.html).
- Handling file uploads and downloads with [Flask](https://flask.palletsprojects.com/en/2.0.x/).

## Set up

We'll be using Python for this tutorial. Sign into [Replit](https://replit.com) or [create an account](https://replit.com/signup) if you haven't already. Once logged in, create a new Python repl.

![New repl](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/new-repl.png)

## Creating the web application

Our web application will do two things: allow users to upload spreadsheets and produce downloadable PDFs. Let's start with a scaffolding of initial code in the `main.py` file, as below:

```python
from flask import Flask, request
from flask.helpers import send_from_directory
from werkzeug.utils import secure_filename
import os, traceback

site = Flask(__name__)

@site.route('/')
def index():
    pass

@site.route('/process', methods=["POST"])
def upload_and_process():
    pass

site.run(host='0.0.0.0', port=8080)
```

Here we've imported all the Flask components we'll need, created our Flask application and set up the index and `/process` routes. File upload functionality is commonly abused to hack web applications, so we need to implement a number of security mechanisms to keep our implementation safe. To facilitate this, we've imported a [utility for sanitizing filenames](https://werkzeug.palletsprojects.com/en/2.0.x/utils/#werkzeug.utils.secure_filename) from [Werkzeug](https://werkzeug.palletsprojects.com/en/2.0.x/), the [WSGI](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface) library Flask is built on.

In order to let the user upload and download files, we'll need to create directories to store these files. Add the following code just below the line `site = Flask(__name__)`.

```python
site.config["UPLOAD_DIR"] = "spreadsheets" # for uploaded spreadsheets
site.config["OUTPUT_DIR"] = "reports" # for downloadable PDF reports
site.config["PLOT_DIR"] = "plots" # for data visualization images

for dir in ["UPLOAD_DIR", "OUTPUT_DIR", "PLOT_DIR"]:
    if not os.path.exists(site.config[dir]):
            os.mkdir(site.config[dir])
```

Here we define our directories and create them if they don't exist, using our Flask app's [configuration dictionary](https://flask.palletsprojects.com/en/2.0.x/config/).

Now let's restrict the kinds of files that can be uploaded, to prevent users from uploading the wrong files. Enter the following code just below the lines you added above:

```python
ALLOWED_EXTENSIONS = {'xlsx', 'xls', 'ods'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
```

This code comes from Flask's [file upload pattern](https://flask.palletsprojects.com/en/2.0.x/patterns/fileuploads/). The `allowed_file` function will return `True` if the filename passed to it has an extension and that extension is in our [set](https://realpython.com/python-sets/) of allowed extensions, permitting spreadsheet files only.

Now let's create our application's homepage. Find the `index()` function definition, and replace `pass` with the function body shown below.

```python
@site.route('/')
def index():
    return """
<!DOCTYPE html>
<html>
  <head>
    <title>Sales Report Generator</title>
  </head>
  <body>
    <h1>Upload sales spreadsheet</h1>
    <form action="/process" method="post" enctype="multipart/form-data">
      <input type="file" name="file">
      <input type="submit" value="Generate report">
    </form>
  </body>
</html>
"""
```

Feel free to spice up this bare-bones upload page with your own text and styling. Once you're satisfied, we can move on to the `process` route, which will handle files uploaded by this form. Find the `upload_and_process()` function definition and replace `pass` with the function body below.

```python
@site.route('/process', methods=["POST"])
def upload_and_process():
    if "file" not in request.files: # invalid request
        return "Invalid request."

    file = request.files['file']
    if file.filename == '': # no file uploaded by user
            return "No file selected."

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(site.config['UPLOAD_DIR'], filename))

        try:
            process_spreadsheet(os.path.join(site.config['UPLOAD_DIR'],filename))
        except Exception as e:
            print(e)
            traceback.print_exc()
            return "An error occurred. Please ensure that your spreadsheet is correctly formatted and try again."
        else:
            return send_from_directory(directory=site.config["OUTPUT_DIR"], path="report.pdf")
```

The first two if statements in this code handle errors: if an improper or empty `POST` request is made to the `/process` route, it will return an error.

The final if statement checks whether the uploaded file has an allowed extension, using the `secure_filename` utility we imported above to sanitize its filename, and saves it to our uploads directory.

Our code then attempts to process the spreadsheet. This is a complex process that can throw errors, if, for example, users upload spreadsheets in unexpected formats, so we will use Python's [error handling](https://docs.python.org/3/tutorial/errors.html) to recover from such errors gracefully.

If spreadsheet processing fails, our web application will show the web user a short and user-friendly error message while displaying the real error for us in the console. Real error messages often contain sensitive information, such as directory names and lines of code, and can be confusing for non-technical users, so it's better to avoid displaying them in our web interface.

If spreadsheet processing succeeds, it will send the newly created PDF to the user.

For now, if you run your repl and try to upload spreadsheets, it will lead to an error, as we have not yet defined the `process_spreadsheet()` function. We'll do so in the next section.

## Processing spreadsheets with pandas

Now that we've created our interface, we can start doing some data processing. We'll be using [this spreadsheet of fruit sales](https://tutorial-files.util.repl.co/pdf-report-generator/sales-july-2021.xlsx) as an example. Download it now and take a look inside. You'll see two worksheets: one with sales data, and one with inventory data.

![Spreadsheet data](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/spreadsheet_data.gif)

Return to Replit and at the top of `main.py`, add the following lines:

```python
import pandas as pd
import numpy as np
import openpyxl
```

[Pandas](https://pandas.pydata.org/) is a widely used Python data analysis library, commonly used by data scientists. It provides a number of useful functions and objects for working with series and tabular data, most notably the [DataFrame object](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html). [NumPy](https://numpy.org) provides mathematical functions for use with arrays and matrices, and is often used together with pandas. Finally, [openpyxl](https://openpyxl.readthedocs.io/en/stable/) is the library pandas uses for reading spreadsheet files – we won't use this library directly, but we need to include it in our imports so that our repl installs it.

Define the `process_spreadsheet()` function above the `index()` function definition. Use the following code:

```python
def process_spreadsheet(filename):
    # Wrangle spreadsheet
    spreadsheet = pd.read_excel(filename, sheet_name=["Sales", "Inventory"])
    sale_data = spreadsheet["Sales"]
    item_data = spreadsheet["Inventory"]
```

Here we use pandas's [`read_excel`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html#pandas.read_excel) function to import each worksheet in our spreadsheet as a DataFrame object. The DataFrame, being a tabular structure, shares a number of similarities with spreadsheets, as well as tables in an SQL database.

Speaking of SQL tables, the next thing we're going to do is [`join`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.join.html#pandas.DataFrame.join) `sale_data` with `item_data`, using the item code column. Add the line below to the bottom of `process_spreadsheet()`:

```python
    # Join item data to sale data
    sale_data = sale_data.join(item_data.set_index("Code"), on="Item Code", how="inner")
```

This code will give each row of our sales data the appropriate item information, including the item's name, cost price and sale price. If you'd like to learn more about combining DataFrames, [this RealPython tutorial](https://realpython.com/pandas-merge-join-and-concat/) provides an overview.

To see what the newly joined sales DataFrame looks like, add the following line below the definition of `sale_data`:

```python
    print(sale_data)
```

Then run your repl, upload the `sales-july-2021.xlsx` spreadsheet, click "Generate report" after selecting the spreadsheet, and watch the Replit console. You should see something like this:

![Sales dataframe](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/sales_dataframe.png)

## Calculating insights from data

Now that we've integrated our data, let's generate some insights to report on. We'd like to make a report that answers the following questions:

1. Which sales person brought in the most revenue?
2. Which sales person brought in the most profit?
3. What was our most discounted item on average?
4. How much of each item do we have left in stock?

To answer the first two questions, we'll need to group our data by sales person. To answer the last two questions, we'll need to group our data by item. Let's do this now, using DataFrame's [`groupby`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.groupby.html#pandas.DataFrame.groupby) method. Add the below code to the bottom of `process_spreadsheet()`:

```python
    # Group data
    sales_by_salesperson = sale_data.groupby("Sales Person")
    sales_by_item = sale_data.groupby("Item Name")
```

Now we can use our grouped data to calculate the answer to each question. We'll add the answers to the relevant dataframes as we go.

### Revenue by salesperson

We can get the revenue for each sale with the below calculation:

```
Sale Revenue = Quantity Sold * (Sale Price * (1 - Discount))
```

By making use of the DataFrame's operator overloading, we can apply this calculation to every column at once. Add the following code to the bottom of your `process_spreadsheet()` function:

```python
    # 1. Which sales person brought in the most revenue?

    # 1.1 Calculate revenue for each sale
    sale_data["Sale Revenue"] = sale_data["Quantity Sold"] * \
        (sale_data["Sale Price"] * (1 - sale_data["Discount"]))
```

Note that we're using a backslash (`\`) to [split a single line of code over two physical lines](https://docs.python.org/3/reference/lexical_analysis.html#line-structure), for improved readability. Don't confuse this with the division operator (forward slash: `/`).

If we look at our data now (use a `print` statement like the one we used earlier to print to the console and rerun your repl), you'll notice that the Sale Revenue column contains more than two decimal places.

![Decimal places](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/sale_revenuedp.png)

Seeing as this is a currency column, we want to round it down to the nearest hundredth. We'll write a quick inner function for this now, by placing the following code just below `def process_spreadsheet(filename):` above:

```python
    def floor_currency(value):
        # Round down to two decimal places
        return np.floor(value*100)/100
```

Here we use NumPy's [`floor()`](https://numpy.org/doc/stable/reference/generated/numpy.floor.html) function to round values down. As `floor()` rounds to integer values, we can multiply and then divide by 100 to get two decimal places.

Now that we've added that function, we can return to our calculations at the bottom of the `process_spreadsheet()` function. Add the line below:

```python
    # 1.2 Round down to 2 decimal places
    sale_data["Sale Revenue"] = sale_data["Sale Revenue"].apply(floor_currency)
```

This uses the [`DataFrame.apply()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.apply.html) method to run `floor_currency()` on every row in the Sale Revenue Column. This is similar to [`map()`](https://realpython.com/python-map-function/) in standard Python.

Finally, we'll use our `sales_by_salesperson` grouping to calculate each sales person's total revenue, and sort them from highest to lowest. Add the following code:

```python
    # 1.3 Group sales by sales person and sum sale revenue
    revenue_by_salesperson = sales_by_salesperson["Sale Revenue"].sum().sort_values(
        ascending=False)
```

Note that `sales_by_salesperson` recognises the Sales Revenue column even though we defined it before that column was added. We can think of objects returned by `groupby` as filters or views on DataFrames, rather than as DataFrames in and of themselves.

### Profit by salesperson

We can get the profit for each sale using the following calculation:

```
Sale Profit = Sale Revenue - (Cost Price * Quantity Sold)
```

The code for this calculation is largely similar to the code used for calculating revenue by sales person. Add it beneath the code you inserted above.

```python
    # 2. Which sales person brought in the most profit?

    # 2.1 Calculate profit for each sale
    sale_data["Sale Profit"] = sale_data["Sale Revenue"] - \
        (sale_data["Cost Price"] * sale_data["Quantity Sold"])
    # 2.2 Round down to 2 decimal places
    sale_data["Sale Profit"] = sale_data["Sale Profit"].apply(floor_currency)
    # 2.3 Group sales by sales person and sum sale profit
    profit_by_salesperson = sales_by_salesperson["Sale Profit"].sum().sort_values(
        ascending=False)
```

### Average discount by item

This is a simple one: we just need the average of each item's Discount values. We can do this in one line of code, as below:

```python
    # 3. What was our most discounted item on average?
    average_discounts = sales_by_item["Discount"].mean().sort_values(ascending=False)
```

### Remaining stock by item

Here we'll need to get the Quantity Sold per item from `sales_data` and subtract it from the Stock of each item in `item_data`. Add the following code:

```python
    # 4. How much of each item do we have left in stock?

    # 4.1 Sort item_data by name to match sales_by_item
    item_data = item_data.sort_values("Item Name")
    # 4.2 Calculate total sold of each item and add it to item_data as a new column
    item_data = item_data.assign(
        StockSold=sales_by_item["Quantity Sold"].sum().values)
    # 4.3 Add a second new column showing the difference between Stock and StockSold
    item_data["StockLeft"] = item_data["Stock"] - item_data["StockSold"]
```

First, we sort `item_data` by name, to match the sorting of `sales_by_item`, so that all our rows will match up correctly. Then, we use `assign` to create a new column named StockSold in `item_data`. We assign to this the total Quantity Sold per item, using our `sales_by_item` view of `sale_data`. Finally, we create a column named StockLeft by subtracting the values in StockSold from those in Stock.

### Seeing results

To see the results of these calculations in the Replit console, add the following print statements just below the above code. We'll use the [`DataFrame.head()`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.head.html#pandas.DataFrame.head) method to only show the first five rows of each result.

```python
    # Display results
    print(revenue_by_salesperson.head())
    print(profit_by_salesperson.head())
    print(average_discounts.head())
    print(item_data[["Item Name", "Stock", "StockSold", "StockLeft"]].head())
```

Note the notation in the final line: this allows us to show only selected columns of any `DataFrame`.

Now run your repl and upload the `sales-july-2021.xlsx` spreadsheet you downloaded earlier. If your code is working correctly, you should see a number of tables in the Replit console, similar to the screenshot below.

![Console dataframe output](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/console_dataframe_output.png)

## Plotting graphs

Now that we've got our data ready, we need to put it into some nice visualizations. Pandas includes methods for generating charts and graphs from DataFrames and other data objects. These methods are thin wrappers over [Matplotlib](https://matplotlib.org/), Python's most widely used data visualization library.

Although we won't be using it directly, we'll need to import Matplotlib so that we can configure it to run in the background, otherwise Replit will open a Tkinter window to render our plots in. Add the following lines to the top of `main.py` to do this:

```python
import matplotlib as mpl
mpl.use('Agg')
```

We're going to create two pie charts for our sales data, and one bar chart for our discount data. We'll leave our stock data as a table.

### Sales pie charts

Because we're creating two pie charts, let's start by defining an internal function. Add the following code to the bottom of `process_spreadsheet()`:

```python
# Create sales pie charts
    def salesperson_pie_chart(df, yaxis, filename):
        explode = np.zeros(df.shape[0])
        explode[0] = 0.1

        pie_profit = df.plot(
            y=yaxis,
            kind="pie",
            explode=explode,
            autopct=lambda value: "${:,.2f}".format(
                floor_currency(value/100 * df.sum())))

        pie_profit.get_figure().gca().set_ylabel("")
        pie_profit.get_figure().tight_layout()
        pie_profit.get_figure().savefig(filename)
        pie_profit.get_figure().clf()
```

There's a lot happening here, so let's go through it step by step:

1. Our new inner function takes three parameters, a DataFrame to plot, the name of the column to use as the y-axis, and a filename to save the finished plot to. We will be passing `revenue_by_salesperson` and `profit_by_salesperson` into it.
2. Before drawing our graph, we create an array `explode`, which is a [numpy array of zeros](https://numpy.org/doc/stable/reference/generated/numpy.zeros.html#numpy-zeros) of the same length as our DataFrame (`DataFrame.shape[0]` is a handy way of getting the number of rows). We then replace the first value with 0.1. This will allow us to pull out the largest slice of the pie, improving the visualization.
3. We then plot the pie chart, using the specified `yaxis`.
4. The `autopct` argument allows us to specify how we would like to display the numeric labels on each slice. Pie charts in Matplotlib default to showing percentages, but we want to see currency values, so we pass in an anonymous function that multiplies each percentage by the sum of our DataFrame's second column. We also use our `floor_currency()` function and Python string formatting to make our values display as currency values.
5. We then remove the y-axis label, use [`tight_layout()`](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.tight_layout.html) to avoid excess white space, and save our figure to a file.
6. Finally, we call our plot's [`clf()`](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.clf.html) method. This clears the current plot, so we can start drawing a new one. Because of the way Matplotlib works, if we don't do this, we'll end up drawing plots on top of each other.

Below this function definition, we'll add the following calls, which will generate both pie charts:

```python
    salesperson_pie_chart(revenue_by_salesperson, "Sale Revenue",
        os.path.join(site.config["PLOT_DIR"], "revenue_by_salesperson.png"))
    salesperson_pie_chart(profit_by_salesperson, "Sale Profit",
        os.path.join(site.config["PLOT_DIR"], "profit_by_salesperson.png"))
```

If you run your repl now and reupload the spreadsheet, you should see two new image files in the `plots` directory.

![Piechart plots](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/piechart_plots.png)

### Discount bar chart

Our bar chart code is fairly similar to our pie chart code. Add the following code at the bottom of `process_spreadsheet()`.

```python
    # Create bar chart
    bar_ave_discount = average_discounts.plot(
                        y="Discount",
                        kind="bar",
                        rot=45)

    bar_ave_discount.get_figure().gca().set_xlabel("")
    bar_ave_discount.get_figure().tight_layout()
    bar_ave_discount.yaxis.set_major_formatter(
        mtick.PercentFormatter(xmax=1.0, decimals=0))
    bar_ave_discount.get_figure().savefig(
        os.path.join(site.config["PLOT_DIR"],
            "item_average_discount.png"))
    bar_ave_discount.get_figure().clf()
```

In addition to setting this plot as a bar graph, we're use the `rot` argument to show the labels for the chart's x-axis at an angle, and we're using Matplotlib's [PercentFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.PercentFormatter) to show the chart's y-axis labels as percentages. To use this function, add the following import statement near the top of `main.py`, just below your other `matplotlib` imports:

```python
import matplotlib.ticker as mtick
```

Run your repl now, upload the spreadsheet, and you should see three images in the `plots` directory. In the next and final section of this tutorial, we'll be putting these three images into a PDF document, along with some textual and tabular data.

## Creating a PDF

We will create our PDF using the [PyFPDF library](https://pyfpdf.readthedocs.io/en/latest/). Add the following import statement to the top of `main.py` to use this library:

```python
from fpdf import FPDF
```

Now return to the bottom of `process_spreadsheet()`, and add the following code to initialize a new PDF document:

```python
    # Create PDF
    pdf = FPDF('L') # landscape
    pdf.add_page() # first page
    pdf.set_font('arial', '', 12) # 12pt Arial text
```

The FPDF class provides a few different ways to insert text and images into our PDF. We will be using the [`cell()`](https://pyfpdf.readthedocs.io/en/latest/reference/cell/index.html) and [`image()`](https://pyfpdf.readthedocs.io/en/latest/reference/image/index.html) methods for inserting table cells and images.

Calls to `cell` and `image` will insert elements at the current position on the page. We'll call this position the _cursor_. The `cell` method includes a parameter which specifies where to place the _cursor_ following the insertion of each cell. The cursor can also be set manually using x and y coordinates. These two factors, especially the former, can make it difficult to mentally model FPDF code, so it's good practice to leave a lot of comments.

The first thing we'll add to our page is a heading for our revenue pie chart. Add the following code below the line where you set the font.

```python
    # Pie charts
    pdf.cell(112, # width
             20, # height
             "Revenue by salesperson", # text
             0, # border (0 = none, 1 = border)
             0, # where to put the cursor for the next cell
                # (0 = right, 1 = next line, 2 = directly below)
             "L") # text alignment
```

As this is a landscape page, we'll place the heading for the profit pie chart to the right of this one, using the following code.

```python
    pdf.cell(110,20, "Profit by salesperson", 0, 1, "L")
```

Our cursor is now at the start of the line below our headings. To help us place our pie charts, we will record the current cursor coordinates with the code below:

```python
    start_x = pdf.get_x()
    start_y = pdf.get_y()
```

Now we can place our first pie chart:

```python
    pdf.image(os.path.join(site.config["PLOT_DIR"],
                "revenue_by_salesperson.png"), w=110)
```

And our second one, using [`set_xy()`](https://pyfpdf.readthedocs.io/en/latest/reference/set_xy/index.html) to move the cursor to a position next to our first pie chart:

```python
    pdf.set_xy(start_x + 110 + 2, start_y)
    pdf.image(os.path.join(site.config["PLOT_DIR"],
                "profit_by_salesperson.png"), w=110)
```

Note that unlike `cell`, `image` doesn't let us specify where to place the cursor next – it will always place the cursor at the start of the next line. Let's record that position now, so we can return to it later:

```python
    below_pie_y = pdf.get_y()
```

Now we have some more space on the right side of the page, so let's insert our stock table. We'll construct this using `cell` again, but this time we'll give our cells borders. Insert the following code to place our cursor at the top right of the page and create the table headings:

```python
    # Stock table
    pdf.set_font('arial', 'B', 10) # table heading font
    pdf.set_y(start_y)
    pdf.set_x(start_x + 220)

    pdf.cell(30, 10, "Item", 1, 0, "C")
    pdf.cell(30, 10, "Stock Left", 1, 2, "C")
    pdf.cell(-30)
```

The final line returns the cursor to the left-hand side of the Item heading cell. Without this line, our table body would be offset by one cell. Refer to our first invocation of the `cell` method if you don't remember what all the numbers mean.

Now we'll use the [`DataFrame.iterrows()`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.iterrows.html) method to iterate over `item_data` and create our table's body columns. Add the following code:

```python
    pdf.set_font('arial', '', 10) # table rows font
    for _, row in item_data.iterrows():
        pdf.set_x(start_x + 220)
        pdf.cell(30, 10, row["Item Name"], 1, 0, "L")
        pdf.cell(30, 10, str(row["StockLeft"]), 1, 2, "R")
        pdf.cell(-30)
```

We can now add our average discount bar chart, which we're placing just below our pie charts. Add the following code:

```python
    # Bar chart
    pdf.set_font('arial', '', 12) # 12pt Arial text
    pdf.set_xy(start_x, below_pie_y-10)
    pdf.cell(30, 10, "Average discounts", 0, 2, "L")
    pdf.image(os.path.join(site.config["PLOT_DIR"],
                "item_average_discount.png"), w=103)
```

Our report is now complete. End the `process_spreadsheet()` function with the following `return` statement, which uses the FPDF class's [`output()`](https://pyfpdf.readthedocs.io/en/latest/reference/output/index.html) method to write our PDF to a file:

```python
    return pdf.output(os.path.join(site.config["OUTPUT_DIR"],
                        "report.pdf"), "F")
```

To ensure that your PDF opens correctly, open your repl's website in a new tab.

![Replit browser open in new tab](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/replit-browser-open-in-new-tab.png)

Then upload `sales-july-2021.xlsx` again, and wait for your report to generate. It should look something like this:

![Final report](https://docimg.replit.com/images/tutorials/26-pdf-report-generator/final_report.png)

## Where next?

We've covered a number of methods for working and displaying tabular data in this tutorial. From here, you can apply this to your own data munging and visualization needs. Additionally, there's much more to learn about all of these topics.

- Some of our other tutorials delve into other aspects of Flask, such as this [stock market dashboard tutorial](/tutorials/python/personal-stock-market-dashboard). The web application interface we've built above is minimal and may benefit from additional functionality.
- We also have [another tutorial on Matplotlib](/tutorials/python/data-science-and-visualisation-with-repl-it).
- The pandas community has written a number of tutorials, [linked here](https://pandas.pydata.org/pandas-docs/stable/getting_started/tutorials.html).
- Finally, [the FPDF documentation is available here](https://pyfpdf.readthedocs.io/en/latest/index.html).

You can find the code for this tutorial in the repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/speadsheet-to-pdf?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
