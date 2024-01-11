---
title: Predictive text engine
---

# Building a Predictive Text Engine with Node.js

Have you ever wondered how your phone knows what to suggest in the autocomplete box when you are texting? Or how Gmail suggests phrases to you in the middle of typing an email? Predictive text can be a helpful tool for typing quickly.

In this tutorial, we'll make a predictive text engine that learns by example. Newer text prediction engines, like [GPT3](https://en.wikipedia.org/wiki/GPT-3), use neural networks, but we'll use more standard coding for this project.

![Example sentence construction](https://docimg.replit.com/images/tutorials/17-predictive-text-engine/test_run.gif)

## Overview and Requirements

We'll use the [Replit](https://replit.com/) web IDE for developing and running our text engine.

Let's think about the requirements, and come up with some potential solutions. For autocomplete, we normally type in a few words, and then the computer or phone suggests the next few words we are likely to use. The question is basically: _Given an initial phrase, what are some likely next words?_

Let's try to create a solution from that problem statement. What if we make a list of initial phrases, mapped to a list of likely next words? Then, if we type in a phrase, we can look it up in our list and pick out a word that is likely to follow. If we represented it in a JavaScript object, it could have a structure that looks something like this:

```
{
	"intial phrase 1": ["list", "of", "possible", "next", "words"],
	"intial phrase 2": ["next", "likely", "words"],
	.
	.
	.
}
```

Now, let's take that concept and see what it would look like with some real initial phrases, and the likely words that follow:

```
{
    "once upon a" : ["time", "star", "hill", "twice"],
    "the fact that" : ["you", "I","they", "he", "she", "it", "people"],
    .
    .
    .
}

```

This looks good, but each likely word is not equally likely to occur after the initial phrase. For example, we could imagine the initial phrase _"once upon a"_ is more likely to have _"time"_ as the following word than the other possibilities.

We can account for this by adding a probability, or _weight_ for each of the likely words. Instead of an array for our likely words, we can have another object containing the word and its weight. That could look something like:

```
{
    "once upon a" : {"time": 90, "star": 5 , "hill": 4, "twice": 1},
    "the fact that" : {"you": 20, "I": 20, "they": 5, "he":10 , "she": 10, "it": 15, "people":20}
}

```

Now when we look for a possible next word for a given phrase, we can choose the one with a larger weight more often, so it is closer to the word distribution in real language.

This looks like it could work! Next, we need to figure out how to populate this data structure from some example text. Using example text, we can "train" our engine.

Here are the main tasks we'll need to figure out and code:

- Get training text, read it in, and split it into initial phrases, and the words that can come next.
- Populate our data structure with this data.
- Make a function that uses the populated data structure, along with an initial phrase, to generate possible choices for the next word.

## Creating a New Project

1. Head over to [Replit](https://replit.com/) and log in. If you don't have an account already, [create one now](https://replit.com/signup).
2. Create a new repl and choose **Node.js** as your language.
3. Give this repl a name, like "text-autocomplete".

![create new node.js repl with name text-autocomplete](https://docimg.replit.com/images/tutorials/17-predictive-text-engine/new-repl.png)

You should see a new `index.js` file, where we can start adding our code.

## Finding Training Text

To train our engine on what words to predict after an initial phrase, we need to first find some training text. Normally, your phone or Gmail would use your previous texts or emails as its training text. We're going to try something a little different, and see if our text engine can learn from reading books. Free books are easily available online at places like [Project Gutenberg](http://www.gutenberg.org). Head to the site and download three or four books in plain text (marked Plain Text UTF-8). A good place to start is on the [Top Downloaded Page](http://www.gutenberg.org/browse/scores/top).

We should now have a fair amount of text for our engine to learn from. Our autocomplete will choose words in the style of the books used, rather than in our own natural style like Gmail would, but this could be quite interesting. You can get your texts written the way your favorite author would write them!

For this example tutorial, we'll be using [The War of the Worlds by H.G Wells](http://www.gutenberg.org/ebooks/36), [Great Expectations by Charles Dickens](http://www.gutenberg.org/ebooks/1400), and the [Autobiography of Benjamin Franklin](http://www.gutenberg.org/ebooks/20203).

We've downloaded the _plain text_ version of these books, but there is a lot of extra text like table of contents, references, and usage licences that won't be useful for our purposes. Delete these parts from the downloaded books, keeping as many full sentences as possible.

When you're done, copy the text files to your repl by dragging and dropping them onto the file list panel:

![add books to project](https://docimg.replit.com/images/tutorials/17-predictive-text-engine/drag-books-repl.gif)

Great, now we have something for our engine to learn from.

## Reading in the Books

We need to add a reference to the filesystem library to access the books. In the `index.js` file in your new repl, add a reference to `fs`, which is Node's built-in filesystem module.

```javascript
const fs = require("fs");
```

Now, let's create a function that will take a list of files to read in, and return each individual word in an array, so we can more easily access and manipulate them. Add the new function, with a parameter for a list of files to read, and the code to read each file into a string variable:

```javascript
function readFilesIntoWordArray(filenames) {
  let data = "";
  filenames.forEach((file) => {
    data = data + " " + fs.readFileSync(file, "utf8");
  });
}
```

Now we've got all the book data into a single string. We need to split this up into separate words, or _[tokens](https://nlp.stanford.edu/IR-book/html/htmledition/tokenization-1.html)_. We'll consider punctuation as separate tokens as well. We'll need to clean up the data a little before we can do this; this includes removing new lines between sentences (as they have no real semantic meaning for this purpose), and separating out the punctuation from the words.

To do this, let's expand our function with the following code:

```javascript
// remove newlines
data = data.replace(/\r?\n|\r/g, " ");

// Put spaces around each special character / punctuation,
// so that when we split on spaces, they come out as their own tokens,
// disconected from surrounding words
const replacements = [
  ",",
  ".",
  ":",
  "!",
  "?",
  '"',
  "“",
  "”",
  ";",
  "(",
  ")",
  "-",
  "_",
];
replacements.forEach((value) => {
  data = data.replace(RegExp("\\" + value, "g"), " " + value + " ");
});
```

The line `data = data.replace(/\r?\n|\r/g, " ");` uses a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to look for the newline markers [`\r\n` (on windows) and `\n`](https://devhints.io/regexp) on Unix, Linux and macOS.

The next few lines define all the punctuation we expect in our sources. Then, it searches the books for each punctuation mark, and replaces it with a leading space. For example, a question mark at the end of a sentence _"Is this working?"_ would be modified to _"Is this working ? "_.

With our punctuation neatly separated from each word, we must now look for the spaces between things to split our text into tokens. Let's add that code to our function, with the following few lines:

```javascript
// Split on spaces to get each word by itself, indexed.
var word_array = data.split(" ");

// remove all pure whitespace entries
word_array = word_array.filter((word) => word.trim().length != 0);
return word_array;
```

This uses the [string split function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) to split all the sentences into individual words, by looking for the spaces `' '` between them. Then we do a little cleanup to remove any resulting entries that are just pure whitespace.

Great! Now our function will take in a list of books, and convert each word or punctuation mark into an element in an array, like this:

```javascript
[
  "No",
  "one",
  "would",
  "have",
  "believed",
  "in",
  "the",
  "last",
  "years",
  "of",
  "the",
  "nineteenth",
  "century",
  "that",
  "this",
  "world",
  "was",
  "being",
  "watched",
  "keenly",
  "and",
  "closely",
  "by",
  "intelligences",
  "greater",
  "than",
  "man",
  "’",
  "s",
  "and",
  "yet",
  "as",
  "mortal",
  "as",
  "his",
  "own",
  ";",
];
```

## Creating the Data Structure

Now that we have all the books tokenized in an array, let's see how we can populate our proposed data structure with them. We'll create another function to deal with this, called `buildMap`. Add this to the `index.js` file:

```javascript
function buildMap(tokens, depth) {}
```

The parameter `tokens` accepts, as an argument, the output of the file parsing function we created above. `depth` refers to how many tokens long the initial phrases should be.

Now, let's think a bit about the algorithm we'll need to devise to extract the initial phrases, and the words that are likely to follow from our tokens. We need to go through the tokens, at `depth` amount at a time, in a kind of sliding window fashion to extract the initial phrases. You could visualize it like this:

![sliding window over text](https://docimg.replit.com/images/tutorials/17-predictive-text-engine/build-map.gif)

We'll look in our structure to see if that phrase is already there – if not, we'll add it. Next we'll look at the word immediately after the phrase, and check if it is in the list of likely words for that phrase. If it is already there, increment its weight. If it's not already there, add it and set its weight to 1.

In pseudo-code, this could be expressed as:

```
for each entry in the tokens
	create a phrase from the current token and the next depth-1 number of tokens
		if the phrase doesn't already exist in the map
			add the phrase to the map

		get the next token after the phrase (current token + depth index) as likely word
			if the word does not exist in the phrase word list
				add word
			increment word weight

```

Cool, let's add this as code to the function `buildMap`. It should look like this:

```javascript
let map = {};

// for each entry in the tokens
for (let index = 0; index < tokens.length - depth; index++) {
  //create a phrase from the current token and the next depth-1 number of tokens
  let phrase = "";
  for (let depthIndex = 0; depthIndex < depth; depthIndex++) {
    const curr_word = tokens[depthIndex + index];
    phrase = phrase + " " + curr_word;
  }
  // Get rid of any extra space we added in when constructing the phrase from tokens
  phrase = phrase.trimStart();

  //if the phrase doesn't already exist in the map
  //    add the phrase to the map, and add a blank
  if (!map[phrase]) {
    map[phrase] = {};
  }

  // Gets the next word after the phrase
  let next_word = tokens[index + depth];

  // See if the next word exists in the phrase word list
  // If it doesn't already exist in the possible next word list, add it in, and set weight to 1
  // if it does exist, just increment the weight
  let next_word_list = map[phrase];
  if (!next_word_list[next_word]) {
    next_word_list[next_word] = 1;
  } else {
    next_word_list[next_word]++;
  }
}

return map;
```

In **line 1**, we create an empty object using the [literal notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) to hold our data structure, which is a map between phrases and words that follow.

In **line 4**, we setup a for loop to run through each token. Notice that we only run up to the token's array length less the phrase depth. This is because we need to take into account that we have to get a word _after_ the last phrase, so we must stop getting phrases before the end of the token array.

The rest of the code implements our pseudo code. The comments match the place in the pseudo code that the real code implements.

Now we have a way to build up our data structure using our training text.

## Completing a Phrase

Let's use our data structure, along with an initial phrase, to pick out a suggestion/completion. There are two parts to this task:

1. Find the matching phrase, and likely next words in our map.
2. Pick one of the likely words to follow the phrase.

To find the matching phrase and retrieve the likely word list, we can use the indexer functionality of JavaScript. Let's create a method to hold this logic. As inputs, we'll need the phrase to autocomplete, along with a populated map.

```javascript
function suggest_word(start_phrase, word_map) {
  let word_list = word_map[start_phrase];
}
```

We now have the function definition, and we have retrieved the word list for the given phrase. We need to pick one of words from the list to return. Remember that we gave each word a weighting, which is related to how frequently that word appears after the phrase from our learning text. We need to find a way to choose a word from the list randomly, but still respecting the frequency distribution, or weights.

One way to think of this is to lay each of the possible choices out on a line, with the space or length of each choice proportional to its weight.

![weighted choice representation](https://docimg.replit.com/images/tutorials/17-predictive-text-engine/weighted-words.png)

Then we can choose a random point on the line. Whatever word block that random choice lands in, is the word we choose. This way, we are more likely to land on a word with a larger weight, because it takes up more of the line. So we can still choose randomly (i.e. not always return the same word), but still respect the word frequency distribution of natural language.

We may understand the principle, but how do we do this in code? When we lay out all the words end to end, sized by their weights, we are creating a line with length equal to the sum of all the word weights. Then, when we choose a random point on the line, it is equivalent to choosing a random number between 0 and the sum of all the weights. To find the word "under" the point, we can run through our word list again, and "add" each word weight until we match our randomly chosen number. This type of algorithm is known as a _weighted random choice_ algorithm, and there are many ways to implement it.

This sounds like a job for another function. Let's create a function that takes in a weighted word list, and implements the algorithm above:

```javascript
function choose_word_weighted(word_list) {
  // Get an array of all the words in the word list object,
  // so we can run through each and get their weights
  var keys = Object.keys(word_list);

  // Get the sum of all the weights
  let sum_of_weights = 0;
  keys.forEach((key) => {
    sum_of_weights += word_list[key];
  });

  // Math.random() returns a number from 0 to 1,
  // so we scale it up the sum of the weights
  let random = Math.random() * sum_of_weights;

  // Go through the words one by one, and subtract its weight from
  // our random number. When we reach 0 or below,
  // that is the word we choose
  let curr_word = "";
  keys.every((word) => {
    curr_word = word;
    random -= word_list[word];
    return random > 0;
  });

  return curr_word;
}
```

The first code line `var keys = Object.keys(word_list);` uses a built-in JavaScript function from the base [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) to get all the keys (the words in our likely list), and [return them as an array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys). This allows us to use this array to iterate over, and query our word list object word by word for each weight.

You'll notice in the last part of the function, we subtract word weights from our random point. This is equivalent to adding word weights until we reach the random number. It just saves us another variable. You'll also notice that we use `keys.every()` instead of the more usual `keys.forEach`. This is because (despite its name), `every` allows us to break out early from the loop when we find the word that is under our random point, whereas `forEach` does not allow a break early.

Now we can choose a word with weighted randomness. Let's complete our `suggest_word` function we started. We just need to call our `choose_word_weighted` function, so let's update it:

```javascript
function suggest_word(start_phrase, word_map) {
  let word_list = word_map[start_phrase];
  let suggested_word = choose_word_weighted(word_list);
  return suggested_word;
}
```

## Putting it All Together

We've made all the parts. Now let's put it all together and see how it works. We need to:

1. Read all the books in.
2. Build the map.
3. Test a phrase to complete.

We also need to set a `depth`, or the number of words in our initial phrases that we want to predict off of. Aim for two or three; any more than that and the phrases become very unique and we may not have enough data to have seen all of those combinations.

Our completed code, with the above added in, should look like this:

```javascript
const fs = require("fs");

const depth = 3;
let all_words = readFilesIntoWordArray([
  "hgwells.txt",
  "franklin.txt",
  "dickens.txt",
]);
let map = buildMap(all_words, depth);

let initial_phrase = "and then I";
let output = suggest_word(initial_phrase, map);
console.log(initial_phrase + ": " + output);

function suggest_word(start_phrase, word_map) {
  let word_list = word_map[start_phrase];
  let suggested_word = choose_word_weighted(word_list);
  return suggested_word;
}

function choose_word(word_list) {
  var keys = Object.keys(word_list);
  var word = keys[(keys.length * Math.random()) << 0];
  return word;
}

function choose_word_weighted(word_list) {
  // Get an array of all the words in the word list object,
  // so we can run through each and get their weights
  var keys = Object.keys(word_list);

  // Get the sum of all the weights
  let sum_of_weights = 0;
  keys.forEach((key) => {
    sum_of_weights += word_list[key];
  });

  // Math.random() returns a number from 0 to 1,
  // so we scale it up the sum of the weights
  let random = Math.random() * sum_of_weights;

  // Go through every word, and subtract its weight from
  // our random number. When we reach 0 or below,
  // that is the word we choose
  let curr_word = "";
  keys.every((word) => {
    curr_word = word;
    random -= word_list[word];
    return random > 0;
  });

  return curr_word;
}

/*
   Runs through the list, gets the next n-1 words, and maps it to the n+1 word
*/
function buildMap(tokens, depth) {
  let map = {};

  // for each entry in the tokens
  for (let index = 0; index < tokens.length - depth; index++) {
    //create a phrase from the current token and the next depth-1 number of tokens
    let phrase = "";
    for (let depthIndex = 0; depthIndex < depth; depthIndex++) {
      const curr_word = tokens[depthIndex + index];
      phrase = phrase + " " + curr_word;
    }
    // Get rid of any extra space we added in when constructing the phrase from tokens
    phrase = phrase.trimStart();

    //if the phrase doesn't already exist in the map
    //    add the phrase to the map, and add a blank
    if (!map[phrase]) {
      map[phrase] = {};
    }

    // Gets the next word after the phrase
    let next_word = tokens[index + depth];

    // See if the next word exists in the phrase word list
    // If it doesn't already exist in the possible next word list, add it in, and set weight to 1
    // if it does exist, just increment the weight
    let next_word_list = map[phrase];
    if (!next_word_list[next_word]) {
      next_word_list[next_word] = 1;
    } else {
      next_word_list[next_word]++;
    }
  }

  return map;
}

function readFilesIntoWordArray(filenames) {
  let data = "";
  filenames.forEach((file) => {
    data = data + " " + fs.readFileSync(file, "utf8");
  });

  // remove newlines
  data = data.replace(/\r?\n|\r/g, " ");

  // Put spaces around each special character/punctuation,
  // so that when we split on spaces, they come out as their own tokens,
  // disconected from surrounding words
  const replacements = [
    ",",
    ".",
    ":",
    "!",
    "?",
    '"',
    "“",
    "”",
    ";",
    "(",
    ")",
    "-",
    "_",
  ];
  replacements.forEach((value) => {
    data = data.replace(RegExp("\\" + value, "g"), " " + value + " ");
  });

  // Split on spaces to get each word by itself, indexed.
  var word_array = data.split(" ");

  // remove all pure whitespace entries
  word_array = word_array.filter((word) => word.trim().length != 0);
  return word_array;
}
```

Run the project by clicking the big **RUN >** button at the top centre of the repl, and see what you get back. Here is an example:

![example autocomplete](https://docimg.replit.com/images/tutorials/17-predictive-text-engine/autocomplete-example.png)

## Can We Do More?

This is pretty good for an engine, which we could integrate into a text/chat app, word processor, or another project. But can we do something else right now just for fun?

What if we keep feeding the last `depth` number of words in the phrase back into the autocomplete, to see if it can come up with a complete sentence? You might have been this game on social media where you are asked to start a comment with "I want" and then keep selecting autocomplete words to come up with a nonsense or comical sentence.

Let's create a new function, `create_sentence` that does this:

```javascript
// Creates a new sequence of words, of max length, given a starting phrase
function create_sentence(start_phrase, word_map, sentence_length, depth) {
  let sentence = "";
  for (let word_count = 0; word_count < sentence_length; word_count++) {
    let next_word = choose_word_weighted(word_map[start_phrase]);
    sentence = sentence + next_word + " ";
    tokenized_phrase = start_phrase.split(" ");
    start_phrase = "";
    for (let i = 1; i < depth; i++) {
      start_phrase = start_phrase + tokenized_phrase[i] + " ";
    }
    start_phrase = start_phrase + next_word;
  }
  return sentence;
}
```

As for the `suggest_word` function, we have parameters for the `start_phrase` and for the populated `word_map`. Then there is also an input for `sentence_length`, which is basically how many rounds to run the autocomplete. We also pass in `depth`, so that this function knows how many words it must use as an initial phrase for each autocomplete round.

The function then sets up a loop to run the autocomplete for `sentence_length` times. It starts off the same as the `suggest_word` function by calling `choose_weighted_word` to get the next word for the given phrase. Then it concatenates that word to a `sentence` string.

The next few lines then split up the initial phrase into individual tokens, takes the last `depth-1` words/tokens, and appends the newly chosen word to the end to make a new initial phrase of `depth` length. Then the cycle starts again, until we have generated a bit of text which is `sentence_length` long.

This is going to give some interesting results! Add the function above to your code, and then modify the initial code to call it:

```javascript
let initial_phrase = "and then I";
let sentence = create_sentence(initial_phrase, map, 50, depth);
console.log(initial_phrase + ": " + sentence);
```

This is an example output.

![sentence generation output](https://docimg.replit.com/images/tutorials/17-predictive-text-engine/sentence-example.png)

It seems like real language, but it's still completely nonsensical and a fun way to generate random stories. Try with varying parameters – initial phrases, sentence length and parameters.

## Other Engine Applications

We can use our engine for other projects. The engine or model we created is known as a type of [Markov Chain](https://en.wikipedia.org/wiki/Markov_chain). A Markov chain is used as a model when we have an environmental 'state', which can transition to other states through a variety of actions. We call something 'Markovian' when the probability of each action, or event, can be sufficiently modelled by only knowing the current state, and not taking into account previous states, or history.

In our case, a state is a phrase of a certain length, and the action is the likely word to pick, leading to a new 'state' or phrase.

Other things that can be modelled quite well with Markov chains include games like Tic-Tac-Toe, or Chess, where the current state is easy to define, and there is a finite list of possible actions for each state (although in Chess, this can get rather large).

## Things to Try Next

There are some ways to improve this engine:

- If it hasn't seen a particular initial phrase, the code will crash. It would be good to add a check to see if the phrase doesn't exist. It could then return an error code or an empty suggestion, rather than crashing.
- It could be cool to make the engine interactive. Try adding a console interface like [readline module](https://nodejs.org/api/readline.html) to prompt for a phrase/input and show the output, allowing you to try multiple phrases in one session.
- Try save the populated map to a data store, so it doesn't have to be re-trained every time you run the program. This would allow you to continually add new books and language examples, making the engine even better. There is a [Replit database](/category/databases) you can use for this.

<iframe height="400px" width="100%" src="https://replit.com/@ritza/text-autocomplete?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
