import Loom from '../../src/components/Loom'

# Managing your Repls

To manage and keep track of all your Repls, head to your Repls Dashboard. You can find it on your account by clicking on the "My Repls" tab on the left-hand side.

Repls are listed in order of when they were created, with the most recent first. Each Repl has its own three-dot menu at the far right. Bringing up this menu will allow you to:

- Edit the Repl (change its name and description)
- View its history
- Fork the Repl
- Move the Repl
- Pin it to your profile
- Delete the Repl
- Toggle privacy settings (subscribers only)

<Loom id="65778d283cbc46d4b63013805cd04f96"/>

## Public vs Private Repls

All Repls created are 'public' by default, meaning anyone on Replit may discover and view the source code. We think that [open-source software](https://en.wikipedia.org/wiki/Open-source_software) is a great thing. It allows users to fork, remix, and republish these Repls to the [community](https://replit.com/community/all), where others can engage and comment.

Users with a [Replit Core membership](https://replit.com/pricing) (previously Hacker or Pro) can make their Repls 'private'. This means that only the creator and anyone they explicitly invite can view the source code.

Note that Private Repls will be inaccessible to other users on Replit if the Repl is hosted, such as HTML, Node.js, or Django Repls. However, the output of those Repls may still be accessible on the internet. If you are hosting sensitive information, we reccomend using a non-hosted Repl to ensure privacy.

## Starring Repls

You can "star" a Repl to mark it as a favorite. This means you can then easily filter your dashboard to show only your starred Repls by clicking on the star slider at the top of your dashboard. There is no limit to how many Repls you can star. Only you can see which Repls you have starred; this info will not appear in your profile.

## Searching

### Basic Search

To search your Repls, click on the search bar. You will be presented with the options "+ New" and "Search". Click "Search" and start typing keywords. This will filter Repls whose title or language match any of the keywords (separated by spaces).

Repls only need to match one of the keywords in order to be included in the results.

Example:

**Search Query:** `draft Repl python3`

**Returns:**
All Repls that satisfy one or more of the following conditions:

- has `draft` in the title
- has `Repl` in the title
- is a `python3` Repl

### Search by Language

You can search for Repls in a specific language by using the `language:` filter.
Typing in `language:` followed by the language you want to filter by will prompt
you with language suggestions.

Your search term will need to be the language name we use internally, which is why
we suggest selecting from the provided list. For example, to search for all C++11
languages, you would search `language:cpp11`. To search for HTML, CSS, JS Repls,
you would search `language:html`. This filter is case sensitive.

### Search by Title

Since plain searches include results with matching languages, you can search within Repl titles only using the `title:` filter. Your search term may not include spaces.
This filter is case insensitive.

Example:

**Search Query:** `title:best project`

**Returns:**
Repls that satisfy one or more of the following conditions:

- has `best` in the title
- has `project` in the title
