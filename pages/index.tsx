import type { NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";
import {
  View,
  rcss,
  tokens,
  Button,
  Surface,
  MultiLineInput,
  GhostwriterIcon,
  LoadingIcon,
  SettingsIcon,
  InfoIcon,
  IconButton,
  TrashIcon,
} from "node_modules";
import { useRef, useState, useEffect } from "react";
import { ChatMessage } from "application/components/ChatMessage";
import useType from "application/hooks/useType";
import Tab from "application/components/Tab";
import {
  historyAtom,
  tabAtom,
  messageAtom,
} from "application/state";
import { useAtom } from "jotai";
import IntroInfo from "application/components/IntroInfo";
import Settings from "application/components/Settings";
import About from "application/components/About";
import autosize from "autosize";
import { useGetJSON } from "application/hooks/fetch";

// random "loading" messages
const loadingMessages = [
  "Hold on while I think...",
  "Thinking...",
  "Hmm...",
  "Interesting...",
  "Evaluating your question...",
  "Hold up a sec...",
  "Uh...",
];

const Home = ({ image, username, bio, roles }) => {
  const [value, setValue] = useAtom(messageAtom);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useAtom(historyAtom);
  const [randomLoadMessage, setRandomLoadingMessage] = useState(
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  );
  const [tab, setTab] = useAtom(tabAtom);
  const { data: usage, refetch } = useGetJSON("/api/getQuota");

  const lastMessage = useType(history);

  const submit = async (v: string) => {
    if (!v) return;
    const historyQueryParam = [];
    let totalLength = 0;

    setRandomLoadingMessage(
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
    );
    setLoading(true);
    setHistory((hist) => {
      const out = [
        ...hist,
        {
          username,
          userImage: image,
          message: v,
          isAmjad: false,
        },
      ];
      for (let i = 0; i < out.length; i++) {
        totalLength += out[i].message.length;
        if (totalLength + out[i].message.length <= 3500) {
          historyQueryParam.push(out[i]);
        }
      }
      return out;
    });
    const { answer, success, message } = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        bio,
        prompt: v,
        roles,
        history: historyQueryParam.map(
          ({ message, isAmjad }) =>
            `${isAmjad ? "Amjad Masad" : "Human"}: ${message}`
        ),
        apiKey: usage.apiKey || undefined,
      }),
    }).then((r) => r.json());

    if (success) {
      setHistory((hist) => [
        ...hist,
        {
          username: "Amjad Masad",
          userImage: "/amjad.jpeg",
          message: answer,
          isAmjad: true,
        },
      ]);
      setLoading(false);
      setValue("");
      updateFocusAndScroll();
    } else {
      setHistory((hist) => [
        ...hist,
        {
          username: "Amjad Masad",
          userImage: "/amjad.jpeg",
          message: `An error occurred: ${message}`,
          isAmjad: true,
        },
      ]);
      setLoading(false);
      updateFocusAndScroll();
    }
  };

  const updateFocusAndScroll = () => {
    scrollRef?.current?.scrollIntoView();
    taRef?.current?.focus();
  };

  useEffect(() => {
    updateFocusAndScroll();
  }, [history, loading, lastMessage, tab]);

  useEffect(refetch, [tab]);

  useEffect(() => {
    if (taRef.current) {
      autosize(taRef.current);
    }
  }, []);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <View
      css={[rcss.flex.grow(1), rcss.flex.row, rcss.justify.center, rcss.p(16)]}
    >
      <Head>
        <title>Amjad Masad Chatbot</title>
      </Head>

      <View
        css={[
          rcss.flex.column,
          rcss.flex.grow(1),
          rcss.borderRadius(8),
          {
            maxWidth: 600,
            overflow: "hidden",
            border: `solid 1px ${tokens.backgroundHigher}`,
            "& > div": {
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
            },
          },
        ]}
      >
        <Surface background="default">
          {/* Tab Header */}
          <View
            css={[
              rcss.p(2),
              rcss.flex.row,
              rcss.align.center,
              rcss.rowWithGap(2),
              {
                borderBottom: `solid 1px ${tokens.backgroundHigher}`,
              },
            ]}
          >
            <Tab
              text="Amjad Masad"
              icon={<GhostwriterIcon />}
              onClick={() => setTab(0)}
              isFocused={tab === 0}
            />

            <Tab
              text="About"
              icon={<InfoIcon />}
              onClick={() => setTab(1)}
              isFocused={tab === 1}
            />

            <Tab
              text="Settings"
              icon={<SettingsIcon />}
              onClick={() => setTab(2)}
              isFocused={tab === 2}
            />

            <View css={[rcss.flex.grow(1)]} />

            {tab === 0 ? (
              <IconButton alt="Clear Chat" onClick={() => setHistory([])}>
                <TrashIcon />
              </IconButton>
            ) : null}
          </View>

          {/* Message Body */}
          <View
            css={[
              rcss.flex.grow(1),
              rcss.flex.column,
              {
                position: "relative",
              },
            ]}
          >
            {/* Message Area */}
            {tab === 0 ? (
              <View
                css={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                {history.length === 0 ? <IntroInfo submit={submit} /> : null}

                {history.map(({ message, userImage, username, isAmjad }, i) => (
                  <ChatMessage
                    key={i}
                    message={
                      i === history.length - 1 && isAmjad
                        ? lastMessage.join(" ")
                        : message
                    }
                    userImage={userImage}
                    username={username}
                    isAmjad={isAmjad}
                  />
                ))}

                {loading ? (
                  <ChatMessage
                    message={randomLoadMessage}
                    userImage="/amjad.jpeg"
                    username="Amjad Masad"
                    isAmjad
                    loading={loading}
                  />
                ) : null}

                <div ref={scrollRef}></div>
              </View>
            ) : null}

            {/* About Area */}
            {tab === 1 ? <About /> : null}

            {/* Settings Area */}
            {tab === 2 ? <Settings /> : null}
          </View>

          {/* Input Form */}
          {tab === 0 ? (
            <Surface background="higher">
              <View
                css={[
                  rcss.p(8),
                  rcss.borderRadius(0, 0, 8, 8),
                  rcss.flex.row,
                  rcss.rowWithGap(8),
                ]}
              >
                <MultiLineInput
                  placeholder="Type a message..."
                  css={[rcss.flex.grow(1)]}
                  style={{
                    resize: "none",
                    opacity: loading ? 0.5 : 1,
                    maxHeight: 300,
                  }}
                  rows={1}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (!e.shiftKey) {
                        e.preventDefault();
                        submit(value);
                      }
                    }
                  }}
                  disabled={loading}
                  ref={taRef}
                  maxLength={500}
                />
                <Button
                  text="Send"
                  onClick={() => submit(value)}
                  disabled={loading}
                  colorway="primary"
                  iconLeft={loading ? <LoadingIcon /> : null}
                />
              </View>
            </Surface>
          ) : null}
        </Surface>
      </View>
    </View>
  );
};

export default Home;

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  if (req.headers["x-replit-user-id"]) {
    return {
      props: {
        image: req.headers["x-replit-user-profile-image"],
        username: req.headers["x-replit-user-name"],
        bio: req.headers["x-replit-user-bio"],
        roles: req.headers["x-replit-user-roles"],
      },
    };
  } else {
    res.setHeader("set-cookie", "REPL_AUTH=FFFFFFFF; Max-Age=0;");
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
}
