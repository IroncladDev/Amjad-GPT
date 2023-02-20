import { View, Text, rcss, tokens, Button, InfoIcon, TwitterIcon, GhostwriterIcon, SendIcon } from 'node_modules';
import { tabAtom, messageAtom } from 'application/state';
import { useAtom } from 'jotai';

const defaultOptions = [
  "Describe Replit in a nutshell",
  "What is Replit to you?",
  "What is Ghostwriter?"
]

const IntroInfo = ({ submit }: { submit: (v: string) => void }) => {
  const [, setTab] = useAtom(tabAtom);
  const [, setMessage] = useAtom(messageAtom);

  return (
    <View css={[rcss.p(16), rcss.colWithGap(8), rcss.flex.column]}>
      <View css={[rcss.flex.row, rcss.rowWithGap(16)]}>
        <img src="/amjad.jpeg" style={{ borderRadius: '50%', border: `solid 1px ${tokens.backgroundHigher}` }} width="64" height="64" />
      </View>
      <Text variant="subheadDefault">Amjad Masad</Text>
      <Text color="dimmer" multiline>This is the beginning of your direct message history with <strong><a href="https://twitter.com/amasad">@amasad</a></strong></Text>
      <View css={[rcss.flex.row, rcss.rowWithGap(8)]}>
        <Button text="About this project" iconLeft={<InfoIcon />} onClick={() => setTab(1)} colorway="teal"/>
        <Button text="Follow Amjad" iconLeft={<TwitterIcon/>} colorway="primary" />
        <Button text="Try Ghostwriter" iconLeft={<GhostwriterIcon/>} colorway="blurple" />
      </View>
      <hr/>
      {defaultOptions.map(option => <View css={[rcss.flex.row]}>
        <Button onClick={() => {
          setMessage(option);
          submit(option)
        }} text={`"${option}"`} iconLeft={<SendIcon/>}/>
      </View>)}
    </View>
  );
};

export default IntroInfo;