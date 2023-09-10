import * as p from "@clack/prompts";
import colors from "picocolors";

const Start = (message: string) => {
  p.intro(message);
};

export default Start;
