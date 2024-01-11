# Add a "Made with Replit" badge to your Webview

You can add a "Made with Replit" badge in your public Repl's webview. It will link back to your Repl's cover page so that visitors can learn more about your creations.

## What is the Webview?

The webview is the view of your repl that visitors to your Repl see when they click "Open website."

The webview appears full-screen in its own browser window, and has the following URL format:

`https://{your-repl-name}--{your-user-name}.repl.co/`

(Or at your custom domain if you've set one up)

*Note: Please refer to [these docs](/hosting/hosting-web-pages.md#end-of-dot-style-domains) to ensure that you are using the correct repl.co domain format.*

## Adding the Badge

The badge can be added to any repl with an index page serving HTML. Any website created with the official HTML template will have this badge added by default.

1. Go to your Repl's file browser and find `index.html`
   ![img-indexfile](https://docimg.replit.com/images/misc/img-indexfile.png)

2. Add the following code before the closing `</body>` tag:

```html
<script
  src="https://replit.com/public/js/replit-badge-v2.js"
  theme="dark"
  position="bottom-right"
></script>
```

![img-htmlcode](https://docimg.replit.com/images/misc/img-htmlcode.png)

## Testing your Badge

1. Run your Repl, then click "Open in a new tab"
   ![img-openintab](https://docimg.replit.com/images/misc/img-openintab.png)

2. Your badge should appear in the lower right. This is what visitors to your page would see
   ![Badge Preview](https://docimg.replit.com/images/misc/badge-preview.png)

3. Click your badge to get back to the Repl's cover page

## Changing the Color Theme

You can change the color of your badge by replacing `theme="blue"` with any color including dark, light, red, orange, yellow, lime, green, teal, blue, blurple, purple, magenta and pink.

```html
<script
  src="https://replit.com/public/js/replit-badge-v2.js"
  theme="pink"
  position="bottom-right"
></script>
```

## Changing the Position

You can change the position of your badge by adding a position attribute with a value of `top-left`, `top-right`, `bottom-left`, or `bottom-right`. If the position isn't changing, check the console for more information - you may have specified an invalid position.

```html
<script
  src="https://replit.com/public/js/replit-badge-v2.js"
  theme="dark"
  position="top-left"
></script>
```

## Removing the Badge

If the badge was already a part of your template and you would like to remove it, simply delete the script from `index.html`:

```html
<!-- Delete this -->
<script src="https://replit.com/public/js/replit-badge-v2.js"></script>
```


## Advanced: Custom Badges

If the default configurations aren't enough for you, you can create your own custom badges with standard HTML and CSS.

Badges are hosted on `https://replit.com/badge`, meaning you can embed an image to further style your badges with CSS. This also means you can embed badges in your GitHub repositories and other Markdown files!

```html
<style>
  #replitBadge {
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>

<img src="https://replit.com/badge?theme=light" id="replitBadge" />
```

You can also supply additional options not available in the script. For example, you can set the caption (maximum limit of 30 characters)

```
https://replit.com/badge?caption=Amazing%20Badges
```

![Amazing Replit badge](https://replit.com/badge?caption=Amazing%20Badges)

or even switch the badge variant to something smaller.

```
https://replit.com/badge?caption=Amazing%20Badges&variant=small
```
![Amazing small Replit badge](https://replit.com/badge?caption=Amazing%20Badges&variant=small)

## Advanced: Embedding into Markdown
You can share off your Replit flare by embedding a badge into your repository README. The following Markdown snippet combines a link and image, allowing you to redirect users directly to your repl. 

```
[![Try with Replit Badge](https://replit.com/badge?caption=Try%20with%20Replit)](https://docs.replit.com/)
```

Try clicking this:

[![Try with Replit Badge](https://replit.com/badge?caption=Try%20with%20Replit)](https://docs.replit.com/)

Please let us know in the community what you think of this feature. Repl on!
