import {
  View,
  rcss,
  Text,
  InfoIcon,
  tokens,
  LoadingIcon,
  IconButton,
  Input,
  Button,
  TrashIcon,
} from "node_modules";
import { useAtom } from "jotai";
import { AppSettings, tabAtom } from "application/state";
import { useState, useEffect } from "react";
import { useGetJSON, usePostJSON } from "application/hooks/fetch";

export default function Settings() {
  const [, setTab] = useAtom(tabAtom);
  const [delay, setDelay] = useAtom(AppSettings.delayMsMultiplier);
  const { data: usage, loading, refetch } = useGetJSON("/api/getQuota");
  const [apiKey, setApiKey] = useState("");
  const [saveApiKey] = usePostJSON({
    url: "/api/addApiKey",
    body: { apiKey },
    onComplete: (d) => {
      if (d.success) {
        alert(d.message);
        refetch();
      } else {
        alert(d.message || "Failed to save API Key");
      }
    },
    onError: (e) => {
      alert(`Failed to save API Key${e ? ": " + e : ""}`);
    },
  });
  const [removeApiKey] = usePostJSON({
    url: "/api/removeApiKey",
    body: {},
    onComplete: ({ success, message }) => {
      alert(message);
      if (success) {
        setApiKey("");
        refetch();
      }
    },
  });

  useEffect(() => {
    if (usage?.apiKey) {
      setApiKey(usage?.apiKey);
    }
  }, [usage]);

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
        <Text>Typing Speed</Text>
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
            <Text>Usage</Text>
            <LoadingIcon />
          </>
        ) : (
          <>
            <View css={[rcss.flex.row, rcss.rowWithGap(4), rcss.align.center]}>
              <Text>
                Usage (
                {usage?.apiKey
                  ? 0
                  : Math.round((usage.usage / usage.total) * 100)}
                %)
              </Text>
              <IconButton
                alt={
                  usage?.apiKey ? (
                    <Text variant="small" multiline>
                      Since you are using your own api key, your quota will not
                      be calculated.
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
                      usage?.apiKey ? 100 : (usage.usage / usage.total) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          </>
        )}
      </View>

      <View css={[rcss.flex.column, rcss.colWithGap(4)]}>
        <Text>API Key</Text>
        <Text variant="small" color="dimmer" multiline>
          Create and save your own OpenAI API key to continue usage after your
          quota has finished.
        </Text>
        <View css={[rcss.flex.row, rcss.rowWithGap(4)]}>
          <Input
            placeholder="sk-Ax03..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button text="Save" colorway="primary" onClick={saveApiKey} />
          <Button
            text=""
            iconLeft={<TrashIcon />}
            colorway="negative"
            onClick={() => {
              const shouldDelete = confirm(
                "Are you sure you want to remove your API Key?"
              );
              if (shouldDelete) {
                removeApiKey();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}
