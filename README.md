# Amjad GPT - Revived

The deprecation of Legacy Hosting on Replit and the retirement of the OpenAI completion models have driven this project's nose into the ground.

I decided to revive it on Jan 10th, 2024.

Changes:
- All previous data has been wiped, you will need to log in again
- You now get a cap of 50 responses if you don't provide an API key
- Tipping this Repl will not increase your response quota
- Removed the outdated organization chart
- Added the Jan 9th version of the Replit Docs
- AmjadGPT now uses Replit Hosting
- Updated a few facts like the current year, Amjad's social follower count, etc
- AmjadGPT now uses `gpt-3.5-turbo-instruct` instead of davinci

---

A chatbot trained to act like [Amjad Masad](https://twitter.com/amasad), built with [LangChain](https://twitter.com/langchainai) and Next.js.

The OpenAI model being used is `gpt-3.5-turbo-instruct`, trained with:
 - Major parts of the [Replit docs](https://docs.replit.com)
 - The [Replit blog](https://blog.replit.com)
 - The Replit [landing page](https://replit.com)
 - Amjad's [personal blog](https://amasad.me)
 - Amjad's [AmA Repl](https://replit.com/@amasad/AmA?v=1)
 - Amjad's Podcasts
 - Some of [Amjad's Tweets](https://twitter.com/amasad)
 - Replit's [Terms of Service](https://replit.com/site/terms) and [Community guidelines](https://welcome.moderation.repl.co)
 - Some random facts the AI should be aware of

All of this data was compiled into a `.index` file.  [Zahid Khawaja](https://twitter.com/chillzaza_) has an [Awesome Tutorial](https://replit.com/@zahidkhawaja/Replit-Assistant?v=1) on how to do this if you want to make your own.

Speaking of which, Thanks a lot Zahid, I couldn't have done this without you 🙏

[Source Code](https://github.com/IroncladDev/Amjad-GPT)

# Quota & Limits

All users have a cap of 50 messages until an OpenAI API key is provided.

One response is one question asked followed by one answer from the chatbot.  Your quota will not be measured in tokens or response length.

# Self-Hosting Instructions

1. Set up the following environment variables:
   - `DEFALT_QUOTA_LIMIT` - number (set to ten in this repl)
   - `MONGO_URI` - a MongoDB database URI
   - `OPENAI_API_KEY` - An OpenAI API key
2. Run `yarn dev` or `yarn build && yarn start`
3. Done!

---

Made with 🧠 & 🔥 by [@IroncladDev](https://twitter.com/IroncladDev)