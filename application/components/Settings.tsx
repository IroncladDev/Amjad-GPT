import {
  View,
  rcss,
  Text,
  Tooltip,
  InfoIcon,
  tokens,
  LoadingIcon,
  IconButton,
} from "node_modules";
import { useAtom } from "jotai";
import { AppSettings, tabAtom } from "application/state";
import { useState, useEffect } from "react";

export default function About() {
  const [, setTab] = useAtom(tabAtom);
  const [delay, setDelay] = useAtom(AppSettings.delayMsMultiplier);
  const [usage, setUsage] = useState<{
    total: number;
    usage: number;
    isAdmin: boolean;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getQuota")
      .then((r) => r.json())
      .then((data) => {
        setUsage(data);
        setLoading(false);
      });
  }, []);

  return (
    <View
      css={[
        rcss.p(16),
        rcss.flex.column,
        rcss.colWithGap(16),
        {
          position: "absolute",
          top: 0,
          left: "50%",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          maxWidth: 400,
          transform: `translatex(-50%)`,
        },
      ]}
    >
      <Text variant="subheadBig">Settings</Text>
      <View css={[rcss.flex.column, rcss.colWithGap(4)]}>
        <Text color="dimmer">Typing Speed</Text>
        <input
          type="range"
          min="1"
          max="50"
          value={delay}
          onChange={(e) => setDelay(+e.target.value)}
        />
        <View css={[rcss.flex.row, rcss.justify.spaceBetween]}>
          <Text variant="small" color="dimmer">
            Faster🔥
          </Text>
          <Text variant="small" color="dimmer">
            Normal 🤖
          </Text>
          <Text variant="small" color="dimmer">
            Slower 🐢
          </Text>
        </View>
      </View>

      <View css={[rcss.flex.column, rcss.colWithGap(4)]}>
        {loading ? (
          <>
            <Text color="dimmer">Usage</Text>
            <LoadingIcon />
          </>
        ) : (
          <>
            <View css={[rcss.flex.row, rcss.rowWithGap(4), rcss.align.center]}>
              <Text color="dimmer">
                Usage (
                {usage.isAdmin
                  ? 0
                  : Math.round((usage.usage / usage.total) * 100)}
                %)
              </Text>
              <IconButton
                alt={
                  usage.isAdmin ? (
                    <Text variant="small" multiline>
                      Since you're a Replit admin, your usage will not be
                      calculated.
                    </Text>
                  ) : (
                    <Text variant="small" multiline>
                      You've used {usage.usage}/{usage.total} responses. Click
                      to read more
                    </Text>
                  )
                }
                onClick={() => setTab(1)}
              >
                <InfoIcon />
              </IconButton>
            </View>

            <View
              css={[
                rcss.p(8),
                rcss.borderRadius(8),
                {
                  background: tokens.backgroundHigher,
                  border: `solid 1px ${tokens.backgroundHighest}`,
                  position: "relative",
                  overflow: "hidden",
                },
              ]}
            >
              <View
                css={[
                  {
                    background: `linear-gradient(90deg, ${tokens.blurpleDimmest}, ${tokens.blurpleDefault})`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${
                      usage.isAdmin ? 100 : (usage.usage / usage.total) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
