---
title: Using Markdown on Replit
sidebar_position: 6
---

# Using Markdown in Replit

[Markdown](https://www.markdownguide.org/) is a lightweight markup language with plain text formatting syntax. It is designed to be easy to read and write, and it converts to valid HTML. Some use cases of Markdown include documentation, project descriptions, text formatting in social media posts, and more. In this tutorial, all major topics including advanced markdown rules will be covered.

## Basic syntax

Basic syntax includes the foundations of markdown usage such as headers, paragraphs, text formatting, and more.

### Bold & italic text

To make text **bold** in Markdown, surround it with two asterisks on each side: `**bold**`.
To make text _italic_ in Markdown, surround it with either one asterisk on each side `*italic*` or with an underscore on each side: `_italic_`

### Inline code

You can denote `inline code` in Markdown by surrounding it with backtick quotes (`` `<insert code here>` ``). Inline code corresponds to a highlighted area in a sentence or paragraph, not an entire block of code.

### Strikethrough text

To ~~strikethrough~~ text in Markdown, surround it with two tildes on each side: `~~strikethrough~~`. This can be used to denote edits or deletions.

### Headings

To create a heading in Markdown, start a new line and put up to six hash symbols followed by a space in front of the header's text `## header`. Using a single hash symbol for a heading specifies the **largest** header and using six hashes renders the **smallest** header.

# Large header example

###### Super small header example

The corresponding Markdown code used to render the above example is included below.

```md
# Large header example

###### Super small header example
```

### Paragraphs

To create a new paragraph, simply add two line breaks after a series of plaintext sentences.

This paragraph is separated from the above one.

```md
I am paragraph number one.

I am paragraph number two, completely separated from paragraph one.
```

### Lists

You can create unordered lists using asterisks `*`, pluses `+`, or hyphens `-`:

- Item 1
- Item 2
- Item 3

```md
- Item 1
- Item 2
- Item 3
```

You can create ordered lists using numbers followed by periods:

1. Item 1
2. Item 2
3. Item 3

```md
1. Item 1
2. Item 2
3. Item 3
```

### Quotes

You can use blockquotes to denote quoted text. To create a blockquote, start a line with `>`:

> This is quoted text

```md
> This is quoted text
```

### Line breaks & thematic breaks

Occasionally, you may want to add a breakline within a paragraph. To do this, you can add two spaces at the end of a sentence and hit the **enter** key to move on to the next line. Alternatively, you can use the HTML tag `<br/>` to make the breakline for you.

I am a broken<br/>
paragraph.

```md
I am a broken<br/>
paragraph.
```

### Code blocks

In many cases, you might have to show a large amount of code within a Markdown document. In the case of technical documentation, code blocks are present almost everywhere. You can surround your code by three backticks ` ``` `.

```
def printHello():
  print("Hello World")

print("Look what I'm printing:")
printHello()
```

To add syntax highlighting, type in three backticks and then the programming language ` ```python `.

```python
def printHello():
  print("Hello World")

print("Look what I'm printing:")
printHello()
```

---

## Embeds

You can also embed [links](https://replit.com/~), images, and videos within Markdown documents.

![a robot coding on replit](https://docimg.replit.com/images/tutorials/markdown/robot-coding-twitter-banner.jpeg)

### Links

To embed a link in Markdown, surround the link text in square brackets `[link]` followed by the link URL surrounded in parentheses `[link](https://replit.com)`. You can now put a [link](https://replit.com) almost anywhere in your markdown document.

```md
You can now put a [link](https://replit.com) almost anywhere in your markdown document.
```

### Images

To embed an image in markdown, start with an exclamation point and put the description of the image in square brackets, followed by the image URL surrounded in parentheses `![a picture of a cute cat](https://docimg.replit.com/images/tutorials/markdown/cat.jpg)`.

![a picture of a cute cat](https://docimg.replit.com/images/tutorials/markdown/cat.jpg)

### Videos

Videos can be embedded easily in most Markdown environments as well. Using default HTML tags, you can link to and embed a video file in your Markdown document.

<video src="https://docimg.replit.com/images/tutorials/markdown/erm.mp4" controls></video>

```html
<video
  src="https://docimg.replit.com/images/tutorials/markdown/erm.mp4"
  controls
></video>
```

### Iframes & inline HTML

Markdown supports the usage of raw HTML code, so this means you can embed [inline frames](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), use special HTML elements, and more. The Repl below is an inline frame, injected into this markdown document with raw HTML.

<iframe 
  height="400" 
  width="100%" 
  src="https://replit.com/@moderation/Welcome?embed=1" 
  scrolling="no" 
  frameborder="no" 
  allowtransparency="true" 
  allowfullscreen="true" 
  sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
/>

```html
<iframe
  height="400"
  width="100%"
  src="https://replit.com/@moderation/Welcome?embed=1"
  scrolling="no"
  frameborder="no"
  allowtransparency="true"
  allowfullscreen="true"
  sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
/>
```

---

## Advanced methods

Some advanced Markdown techniques include tables, extended formatting, and more.

### Tables

Tables display an organized grid of data in rows and columns. Use the vertical line symbol `|` and hyphens `-` to construct a table in markdown.

| name  | age | location  |
| ----- | --- | --------- |
| ben   | 25  | New York  |
| jane  | 37  | Australia |
| rob   | 21  | Brazil    |
| sarah | 43  | France    |

The table above is rendered by the Markdown code below. Using spaces to make the text look clean is optional but recommended.

```md
| name  | age | location  |
| ----- | --- | --------- |
| ben   | 25  | New York  |
| jane  | 37  | Australia |
| rob   | 21  | Brazil    |
| sarah | 43  | France    |
```

### Collapsable details

Collapsing large blocks of text can make your Markdown much easier to digest and navigate.

<details>
  <summary>Click to expand</summary>
  You found me!

Markdown is **still supported** in collapsable sections!

</details>

```md
<details>
  <summary>Click to expand</summary>
  You found me!

Markdown is **still supported** in collapsable sections!

</details>
```

### Small text

Markdown allows the rendering of <sup><sub>super small text</sub></sup> with the HTML [sup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup) (superscript) and [sub](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub) (subscript) tags. Simply surround your text with the `<sup>` and `<sub>` tags to render it super tiny.

```html
<sup><sub>I am so tiny and cute!</sub></sup>
```

### Markdown comments

You can use HTML comments in your Markdown documents or use Markdown syntax to do so as well. Comments do not get rendered in the Markdown output.

```
<!--html comment does not get rendered-->

[This is a Markdown comment]: #
```

### Wrap text around images

You can wrap paragraph text around an image that is aligned to the right. Place your image **first** and then the following paragraph will wrap itself around the image.

<img 
  align="right" 
  width="100" 
  height="100" 
  src="https://docimg.replit.com/images/tutorials/markdown/repl-construction.jpeg"
/>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo eget justo sagittis mattis. Vivamus sollicitudin eget diam ac ultricies. Sed est eros, tempus at justo semper, porttitor blandit est. Integer quis ornare tellus. Nulla facilisi. Nunc eleifend lacus sapien, in tempus augue ultrices quis. Mauris sit amet interdum nisl. Aenean eu fringilla nisi, et lobortis urna. Duis ut tortor quam. Sed rhoncus rutrum dui, placerat facilisis libero consequat commodo. Maecenas varius ligula vel leo bibendum, a feugiat odio mollis.

```md
<img 
  align="right" 
  width="100" 
  height="100" 
  src="https://docimg.replit.com/images/tutorials/markdown/repl-construction.jpeg"
/>

Lorem ipsum dolor sit amet, consectetur adipiscing...
```

---

## Markdown on Replit

Markdown on Replit includes some features that are not native to Markdown such as displaying third-party embeds, modified file routing for images/links, and more.

### Draw files

Creating a file that ends with `.draw` in Replit gives you your own [Excalidraw whiteboard](/teams-pro/excalidraw-with-replit#getting-started-with-excalidraw).

![excalidraw canvas in Replit](https://docimg.replit.com/images/tutorials/markdown/drawing.png)

By using the same format to display an image in Markdown, you can display the draw file's contents in your Markdown file.

![displaying the draw file](https://docimg.replit.com/images/tutorials/markdown/displaying-draw-file.png)

### Links

In Replit's Markdown environment, links work normally but also enable you to link to other Markdown files. Simply use a link and set its destination URL with the file path of another file.

![jumping to different markdown files](https://docimg.replit.com/images/tutorials/markdown/jumplink.gif)

### Third-party embeds

Replit currently allows [YouTube](https://youtube.com) videos, [Loom](https://loom.com) videos, and [Figma](https://figma.com) prototypes to be embedded in Markdown documents. The syntax for this is similar to embedding an image in Markdown.

```md
![](loom-link)
![](figma-link)
![](youtube-link)
```

### Workspace vs. Social Markdown

Markdown in the Workspace is very different than the Markdown you would use on Replit's Community or Bounties. Some of the main differences include:

| Feature                       | Workspace | Social |
| ----------------------------- | --------- | ------ |
| Essential Syntax              | ✅        | ✅     |
| Inline HTML                   | ✅        | ✅     |
| Images                        | ✅        | ✅     |
| Videos / Iframes              | ✅        | ❌     |
| Third-party embeds            | ✅        | ❌     |
| Strikethrough Text            | ✅        | ❌     |
| Replit User mentioning        | ❌        | ✅     |
| External Javascript Execution | ❌        | ❌     |
