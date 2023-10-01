// intro & outro are used to create layouts for output

import { intro, outro, isCancel, cancel, text, spinner } from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";

const standard = async (obj: {
  message: string;
  initialValue?: string;
  placeholder?: string;
  defaultValue?: string;
}) => {
  const answers = await text({
    message: obj.message,
    initialValue: obj.initialValue,
    placeholder: obj.placeholder,
    defaultValue: obj.defaultValue,
  });

  return answers;
};

const waitAnimation = async (obj: {
  time: number;
  startMsg?: string;
  stopMsg?: string;
}) => {
  const s = spinner();
  s.start(obj.startMsg ?? "");
  await sleep(obj.time);
  s.stop(obj.stopMsg ?? "");

  return;
};

const Clack = {
  intro: intro,
  outro: outro,
  standard: standard,
  waitAnimation: waitAnimation,
};

export default Clack;
