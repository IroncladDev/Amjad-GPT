import { View, rcss, Text } from 'node_modules'
import { useAtom } from 'jotai'
import { AppSettings } from 'application/state'

export default function About() {
  const [delay, setDelay] = useAtom(AppSettings.delayMsMultiplier);

  return <View css={[rcss.p(16), rcss.flex.column, rcss.colWithGap(16), {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    maxWidth: 400,
    transform: `translatex(-50%)`
  }]}>
    <Text variant="subheadBig">Settings</Text>
    <View css={[rcss.flex.column, rcss.colWithGap(4)]}>
      <Text color="dimmer">Typing Speed</Text>
      <input type="range" min="1" max="50" value={delay} onChange={e => setDelay(+e.target.value)} />
      <View css={[rcss.flex.row, rcss.justify.spaceBetween]}>
        <Text variant="small" color="dimmer">Faster🔥</Text>
        <Text variant="small" color="dimmer">Normal 🤖</Text>
        <Text variant="small" color="dimmer">Slower 🐢</Text>
      </View>
    </View>
  </View>
}