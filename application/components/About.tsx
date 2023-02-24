import { View, text, tokens, rcss, Button, Text } from "node_modules";
import { MarkdownWrapper } from "./MarkdownWrapper";

export default function About() {
  return (
    <View
      css={[
        rcss.p(16),
        rcss.flex.column,
        rcss.colWithGap(8),
        {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflowY: "auto",
        },
      ]}
    >
      <Text variant="subheadBig">Amjad Masad Chatbot</Text>
      <Text color="dimmer" multiline>
        <MarkdownWrapper>{`
# Amjad Masad Chatbot

A chatbot trained to act like [Amjad Masad](https://twitter.com/amasad), built with [LangChain](https://twitter.com/langchainai) and Next.js.

The OpenAI model being used is \`text-davinci-003\`, trained with:
 - Major parts of the [Replit docs](https://docs.replit.com)
 - The [Replit blog](https://blog.replit.com)
 - The Replit [landing page](https://replit.com)
 - The Replit Employee Organization Chart
 - Amjad's [personal blog](https://amasad.me)
 - Amjad's [AmA Repl](https://replit.com/@amasad/AmA?v=1)
 - Amjad's Podcasts
 - Some of [Amjad's Tweets](https://twitter.com/amasad)
 - Replit's [Terms of Service](https://replit.com/site/terms) and [Community guidelines](https://welcome.moderation.repl.co)
 - Some random facts the AI should be aware of

All of this data was compiled into a \`.index\` file.  [Zahid Khawaja](https://twitter.com/chillzaza_) has an [Awesome Tutorial](https://replit.com/@zahidkhawaja/Replit-Assistant?v=1) on how to do this if you want to make your own.

 - [Model Source Code](https://github.com/Conner1115/Amjad-GPT-Langchain)
 - [Frontend Source Code](https://github.com/Conner1115/Amjad-GPT)

Speaking of which, Thanks a lot Zahid, I couldn't have done this without you 🙏`}</MarkdownWrapper>
      </Text>
      <Text variant="subheadBig">Quota & Limits</Text>
      <Text color="dimmer" multiline>
        <MarkdownWrapper>{`By default, all users get a total of 10 responses.  After you've used up the ten responses, you must add your own OpenAI API key (Open the settings tab) or [tip this Repl](https://ai.repl.page/__repl) to increase your quota.

One response is **one question asked** followed by **one answer** from the chatbot.  Your quota will not be measured in tokens or response length.

 - **100 Cycles tip 🍬** - Quota increased by 20 responses
 - **500 Cycles tip 🍕** - Quota increased by 100 responses
 - **1000 Cycles tip 🌯** - Quota increased by 200 responses

---

Made with 🧠 & 🔥 by [@IroncladDev](https://twitter.com/IroncladDev)`}</MarkdownWrapper>
      </Text>
    </View>
  );
}
