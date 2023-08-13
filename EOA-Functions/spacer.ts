const Spacer = (numOfSpaces?: number) => {
  if (numOfSpaces == undefined) {
    console.log();
  } else {
    for (let i = 1; i <= numOfSpaces; i++) {
      console.log();
    }
  }
};

export default Spacer;
