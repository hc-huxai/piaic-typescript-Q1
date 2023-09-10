import * as p from "@clack/prompts";
import colors from "picocolors";

const End = (message: string) => {
  p.outro(message);
};

export default End;
