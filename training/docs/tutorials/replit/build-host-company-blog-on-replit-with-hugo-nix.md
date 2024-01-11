---
title: Static blog with Nix
---

# Build and host your company blog on Replit with Nix and Hugo

In this tutorial, we will detail how you can use Replit to write and publish a blog or website. This can be a solo endeavour or a group or company blog. We'll build on the versatile Nix repl, using a static site generator called [Hugo](https://gohugo.io/) to ensure our site is fast, secure and flexible. We'll also use some repl tricks which will allow us to develop and host our blog without ever leaving Replit.

<video controls width="80%" autoplay loop src="https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/blogdemo.mp4" type="video/mp4">
</video>

After this tutorial, you will:

- Be familiar with setting up a static website using Hugo.
- Understand how to connect multiple repls through GitHub.
- Find new uses for Replit's collaborative features.

## Repl architecture

This project will make use of two repls:

- A **development repl**, which will be used to write and preview draft posts and make site changes. This repl will be where all development happens.
- A **production repl**, which will be used to host a public version of the site. This repl will be updated from GitHub when new posts are made public.

If you have a premium Replit plan, you might want to make these repls private, to prevent people from finding your unfinished posts.

## Creating the working repl

Log into your [Replit account](https://replit.com/login) and create a new repl. Choose Nix as your project type. Give this repl a name, like "blog-dev".

![Creating the development repl](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/dev-repl.png)

Most kinds of repls are intended for working in a specific programming language or framework, such as Python or Kaboom.js. Nix repls are different: you can think of them as a blank slate for running anything you want. So the first thing we need to do in our repl is define what we're going to run – in this case it will be Hugo. Open `replit.nix` and append `pkgs.hugo` to the `deps` list. Your file should look like this:

```nix
{ pkgs }: {
    deps = [
        pkgs.cowsay
        pkgs.hugo
    ];
}
```

This will install Hugo the next time we run our repl. If you'd like to understand more about what this code is actually doing, check out the tutorial on [building with Nix on Replit](/tutorials/python/build-with-nix).

Run your repl now. Once you see the ASCII cow in the repl console, type the following command:

```sh
hugo new site --force .
```

This will create a new Hugo site in our repl. The `--force` flag is necessary because Hugo usually doesn't like creating new sites in directories that already contain files.

You should now see a number of new directories and files in your repl's file pane. This is the skeleton of your Hugo site. Don't worry about what each of these files and directories is for – you only need to know about a few of them to start blogging, and we'll explain them as we go.

![hugo files](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/hugo-files.png)

Because Hugo is highly flexible and unopinionated, it doesn't even come with a default theme, so we won't be able to see our site in action until we choose one. There are a large number of choices on [Hugo's official themes website](https://themes.gohugo.io/). For this tutorial, we'll be using [Radek Kozieł](https://radoslawkoziel.pl/)'s [Terminal](https://themes.gohugo.io/themes/hugo-theme-terminal/) theme, but feel free to pick a different one later.

To install the theme, run the following command in your repl's console:

```sh
cd themes && git clone https://github.com/panr/hugo-theme-terminal && cd ..
```

This will use Git to download the theme into our site's `themes` directory. To instruct our site to use this theme, add the following line to the bottom of `config.toml`:

```toml
theme = 'hugo-theme-terminal'
```

We must now configure our repl to host our static site so that we can see the results of our work. If you're familiar with static site generators (perhaps from a [previous tutorial](/tutorials/python/static-site-generator), you'll know that this is a two-step process:

1. Render content in markdown and insert it into theme templates to create HTML pages.
2. Host those HTML pages on a web server.

Hugo includes a built-in command that does both, [`hugo server`](https://gohugo.io/commands/hugo_server/). We can make this the command that executes when we click our repl's run button by editing the `run` directive in the `.replit` file as below:

```sh
run = "hugo server --buildDrafts --buildFuture --bind 0.0.0.0 --port 443 --baseURL https://YOUR-REPL-NAME-HERE--YOUR-USERNAME-HERE.repl.co"
```

In this command:

- `--buildDrafts` and `--buildFuture` will ensure that all site content is rendered, even if it's marked as a draft or scheduled for publishing in the future.
- `--bind` `--port` and `--baseURL` are all used to [ensure that our repl will host our site correctly](/hosting/deployments/about-deployments). Make sure to modify the argument for `--baseURL` as indicated (i.e. replacing the placeholders `YOUR-REPL-NAME-HERE` and `YOUR-USERNAME-HERE` with your own values).

Run your repl. You should see an empty site homepage.

![Empty home page](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/empty-site.png)

To create your first post, run the command below in the repl shell. Press Y when prompted to run Hugo from Nix:

```sh
hugo new posts/first-post.md
```

Your site will automatically reload and should now look like this:

![First post](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/first-post.png)

You should see a file named `first-post.md` in the `content/posts` directory with contents resembling the following:

```markdown
+++
title = "First Post"
date = "2022-01-30T11:21:41Z"
author = "Your name"
authorTwitter = "Your Twitter"
cover = ""
tags = ["", ""]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = false
+++
```

The text between the `+++` lines is called [front matter](https://gohugo.io/content-management/front-matter/) and defines metadata for your post, such as its title, author and time posted. Post content can be added as markdown-formatted text below the final `+++`. Add some now.

```markdown
+++
title = "First Post"
date = "2022-01-30T11:21:41Z"
author = "Your name"
authorTwitter = "Your Twitter"
cover = ""
tags = ["", ""]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = false
+++

## Hello world!

This _is_ **my** `first` post!
```

![Post content](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/post-content.png)

## Preparing for production

We now have a functional workspace in which to develop our site, but we need to make a few alterations before it's ready for public consumption. First, let's make it easier to keep unfinished posts as drafts. By default, posts created using the Terminal theme will appear as published as soon as they're created – this is probably not what we want. Luckily, it's an easy fix.

Hugo stores content templates in a directory called [archetypes](https://gohugo.io/content-management/archetypes/). You should see an empty directory with this name in your repl's file pane. Archetype files are named after the content type (e.g. post or page) they're used for – currently, our `archetypes` directory only has a single file, named `default.md`, which will be used for content types without custom archetypes. However, if you look at the contents of `default.md`, you'll notice that it looks nothing like the post we created above. This is because Hugo doesn't just look for archetypes in our site skeleton, but also in our chosen theme.

You should find a file named `posts.md` in `themes/hugo-terminal-theme/archetypes/`. The contents of this file will resemble the new post you made in the last section. Duplicate this file, move it into your top-level `archetypes` directory, and rename it to `posts.md`. Then, in the new file, add the line `draft = true` just above the final `+++`. Your `archetypes/posts.md` file should look like this:

```md
+++
title = "{{ replace .TranslationBaseName "-" " " | title }}"
date = "{{ .Date }}"
author = ""
authorTwitter = "" #do not include @
cover = ""
tags = ["", ""]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = false
draft = true
+++
```

If a file in a top-level directory has the same name as a file in the equivalent theme directory, the former will override the latter. This allows us to make site-specific tweaks without changing our theme. Create a new post by entering the following command into your repl's shell:

```sh
hugo new posts/second-post.md
```

This post and all subsequent new posts will be marked as drafts, and will thus only be included in our website if we run Hugo with the `--buildDrafts` flag. This will be useful for when we create our production repl. But before we can do that, we need to prepare this development repl to connect to it by creating a GitHub repository.

Select the version control tab in your repl's side pane and click on **Create a Git Repo**. This will create a local repository to track your code changes. From here, you can create snapshots of your code (called commits), which can you can revert to if needed.

![Creating a GitHub repo](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/create-repo.png)

To push our repl to a repository on GitHub, we'll need a GitHub account. [Create one](https://github.com/signup) if you haven't before. Once you've created an account or logged into your existing one, return to your repl and click on **Connect to GitHub**. Accept the Oauth confirmation message that appears.

![Connect to GitHub](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/connect-github.png)

Replit will then prompt you to specify a repository name, optional description and privacy setting. You can call your repository "blog". If you have a paid Replit plan, you can make it private, otherwise it will have to be public. Once you've created the GitHub repository, you'll be able to view it on your GitHub account.

![GitHub repo](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/github-repo.png)

Now that your repl is connected to a GitHub repository, any time you make changes, those will be reflected in the version control tab. To commit those changes and push them to your GitHub repository, you can click on **Commit and push** in your repl's version control tab. You will be required to specify a commit message describing the changes you've made.

If our production repl will be sharing a code repository with our development repl, how will we ensure that drafts and future content aren't shown in production? One solution might be to use different branches, but that would require constant merging. All that really needs to change between development and production is the command that gets executed when we click the Run button. We'll use a bit of repl magic to make this work.

First, replace the `run` directive in the `.replit` config file with the following:

```sh
run = "sh run.sh"
```

Then create a file named `run.sh` and add the following code to it:

```sh
#!/bin/bash

if [ "$REPL_SLUG" == 'blog-dev' ] # draft space
then
  hugo serve --buildDrafts --buildFuture --bind 0.0.0.0 --port 443 --baseURL https://$REPL_SLUG--$REPL_OWNER.repl.co
else # production
  hugo serve --bind 0.0.0.0 --port 443 --baseURL https://$REPL_SLUG--$REPL_OWNER.repl.co
fi
```

Here we've used a couple of [repl metadata environment variables](/programming-ide/repl-env-metadata) to trigger different behavior when our code is run in different repls.

Return to your repl's version control tab and commit and push your changes. We are now ready to create the production repl.

![Commit and push to GitHub](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/commitpush.png)

## Creating the production repl

Fork your development repl. Give the new repl a different name, such as "blog".

![Fork repl](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/fork-repl.png)

Since we've forked our development repl, both repls will be backed by the same repository on GitHub. This means we can commit and push changes from one repl (development) and pull those changes into the other repl (production). We could also achieve this by creating a new repl from our GitHub repository, but forking is quicker.

When your production repl is run, you should see an almost identical website to the one in your development repl. The only difference should be that the second post won't appear in the production repl, as it is a draft.

Let's test out our publishing flow.

1. In your **development** repl, add some text to `content/posts/second-post.md`. Specify some or all of the front matter, such as your author name and Twitter account.
2. Set `draft = false` in the post's front matter.
3. From the **development** repl's version control tab, commit and push your changes.
4. In your **production** repl, navigate to the version control tab and click on the "← Pull" link. This will pull the changes we just pushed from development.

![Pull from GitHub](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/pull.png)

5. Rerun your **production** repl. You should now see the contents of the second blog post live on the website.

This will be your workflow for publishing posts. Undraft, commit and push on development, then pull and rerun on production.

If you have a paid Replit plan, you should set your production repl a [Deployment](/hosting/deployments/about-deployments), so that people will always be able to reach your website.

You will probably also want to use a custom domain name, instead of `blog--your-name.repl.co`. Instructions for setting this up are provided [here](/hosting/hosting-web-pages#custom-domains). As a bonus, following this process will also put your site behind [Cloudflare](https://www.cloudflare.com/)'s content delivery network (CDN), improving its performance and reachability across the global internet. Cloudflare is [free for personal and hobby projects](https://www.cloudflare.com/plans/#overview).

*Note: Please refer to [these docs](/hosting/hosting-web-pages.md#end-of-dot-style-domains) to ensure that you are using the correct repl.co domain format.*

## Writing posts

Now that we have a publishing platform in place, let's take a more detailed look at how to create content in Hugo.

The basis of all Hugo blogs is [Markdown](https://daringfireball.net/projects/markdown/), a simple mark-up language for the web, originally created in 2004 by John Gruber. Markdown provides a simple, limited syntax, focused on the common needs of bloggers and other web-based writers. Basic Markdown elements are limited to headings, **bold**, _italic_ and `code-style` text, blockquotes, lists, code blocks, horizontal rules, links and images. Markdown has been extended over the years to provide more advanced formatting, such as tables and footnotes. A cheat sheet covering both basic and extended syntax can be found [here](https://www.markdownguide.org/cheat-sheet/) (Hugo supports both basic and extended Markdown).

To include images in your posts, upload them to the `static` directory. All files and subdirectories in `static` will be rendered as-is from your website's root URL. For example, if you create a file named `static/images/pic.png`, you will be able to include it in your posts by writing `![](https://docimg.replit.com/images/pic.png)`. You can put anything you want in `static`, including documents, audio files, or even videos.

If you want formatting that isn't included in Markdown, such as colored text, you can add HTML and CSS to your posts directly, but first you must configure Hugo's Markdown parser (Goldmark) to accept unsafe input. Add the following lines to `config.toml`:

```toml
[markup.goldmark.renderer]
unsafe = true
```

Stop and start your repl for the config change to take effect.

Hugo also provides functionality called [shortcodes](https://gohugo.io/content-management/shortcodes/), which you can think of as HTML [macros](<https://en.wikipedia.org/wiki/Macro_(computer_science)>). Hugo provides built-in shortcodes for common tasks such as embedding [tweets](https://gohugo.io/content-management/shortcodes/#tweet) and [YouTube videos](https://gohugo.io/content-management/shortcodes/#youtube). You can also [create your own custom shortcodes](https://gohugo.io/templates/shortcode-templates/).

Replit's multiplayer editing features aren't only good for collaborative programming, but can also be used for collaborative blogging. Multiple users can work in the same file in real time, and you can use [inline code threads](https://blog.replit.com/threads) to leave each other feedback and discuss individual words and sentences.

![Collaboration chat](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/thread.png)

If you need to include diagrams in your blog posts, you can draw them using your repl's [built-in Excalidraw](https://blog.replit.com/draw). Just create a new file with a `.draw` extension and start diagramming. When you're done, select your diagram, right-click and chose "Copy to clipboard as SVG". Then paste into the post you want to include the diagram in. Note that Goldmark must be configured in the manner shown above for this to work, as SVG images are part of HTML.

![Drawing on Replit](https://docimg.replit.com/images/tutorials/40-multiuser-blog-nix/diagram.png)

## Where next?

You've now got a fully functional static blog hosted on Replit. Some things you might want to do with it:

- Learn more about Hugo from [the official documentation](https://gohugo.io/documentation/).
- Choose a different theme from the [Hugo themes showcase](https://themes.gohugo.io/) or [create your own](https://gohugo.io/commands/hugo_new_theme/).
- Get a few collaborators and write some more blog posts.

You can find our development and production repls below:

**Development**

<iframe height="400px" width="100%" src="https://replit.com/@ritza/blog-dev?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

**Production**

<iframe height="400px" width="100%" src="https://replit.com/@ritza/blog-prod?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
