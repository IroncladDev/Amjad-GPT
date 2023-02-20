import { useEffect, useState } from "react";
import { ChatMessageType } from "application/components/ChatMessage";
import { AppSettings } from "application/state";
import { useAtom } from "jotai";

export default function useType(history: Array<ChatMessageType>) {
  const [output, setOutput] = useState<Array<string>>([]);
  const [speed] = useAtom(AppSettings.delayMsMultiplier);

  const fire = () => {
    const lastMessage = history.at(-1);
    const words = lastMessage.message.trim().split(" ");
    let index = 0;
    const iteration = () => {
      setOutput((o) => [...o, words[index]]);
      if (index < words.length) {
        setTimeout(() => {
          index++;
          iteration();
        }, words[index].length * speed);
      }
    };
    iteration();
  };

  useEffect(() => {
    if (history.length) {
      setOutput([]);
      fire();
    }
  }, [history]);

  return output;
}
