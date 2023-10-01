import Spacer from "../../functions/Spacer";

const E02_ATM = async () => {
  let terminalWidth: number = process.stdout.columns;
  let terminalHeight: number = process.stdout.rows;

  const programTitle: string = "ATM Machine";

  let columnPlaceholder: string = "";

  for (let i = 1; i <= (terminalWidth - programTitle.length) / 2 - 1; i++) {
    columnPlaceholder += "-";
  }

  Spacer();

  console.log(`${columnPlaceholder} ${programTitle} ${columnPlaceholder}`);

  Spacer();
};

E02_ATM();
