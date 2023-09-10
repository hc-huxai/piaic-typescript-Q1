import { spinner } from "@clack/prompts";
import { setTimeout } from "node:timers/promises";

const Spinner = async (timeout?: number) => {
  const s = spinner();
  s.start();
  await setTimeout(timeout == undefined ? 2000 : timeout);
  s.stop();
};

export default Spinner;
