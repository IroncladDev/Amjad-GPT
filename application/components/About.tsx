import { View, text, tokens, rcss, Button, Text } from 'node_modules'
import { MarkdownWrapper } from './MarkdownWrapper'

export default function About() {
  return <View css={[rcss.p(16), rcss.flex.column, rcss.colWithGap(8), {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowY: 'auto'
  }]}>
    <Text variant="subheadBig">Amjad Masad Chatbot</Text>
    <Text color="dimmer" multiline>
      <MarkdownWrapper>{`This project was created with [LangChain](https://twitter.com/langchainai)`}</MarkdownWrapper>
    </Text>
  </View>
}