import { useEffect, useState } from "react";
import { ChatMessageType } from "application/components/ChatMessage";

export default function useType(history: Array<ChatMessageType>) {
  const [output, setOutput] = useState<Array<string>>([]);

  const fire = () => {
    const lastMessage = history.at(-1);
    const words = lastMessage.message.split(" ");
    let index = 1;
    const iteration = () => {
      setOutput((o) => [...o, words[index]]);
      if (index < words.length) {
        setTimeout(() => {
          index++;
          iteration();
        }, words[index].length * 25);
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
