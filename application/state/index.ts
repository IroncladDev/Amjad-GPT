import { ChatMessageType } from "application/components/ChatMessage";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const historyAtom = atomWithStorage<Array<ChatMessageType>>(
  "historyStore",
  []
);

export const tabAtom = atom(0);
export const messageAtom = atom<string>("");

export const AppSettings = {
  delayMsMultiplier: atomWithStorage<number>("settingsDelayMsMultiplier", 25),
};
