/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise14 = () => {
  let guests: string[] = ["Abu Hurairah", "Hamza", "Osman"];

  Spacer();

  const invitationMsg = (guestName: string) => {
    console.log(
      `Hi ${guestName}, You are invited to Dinner at Hotel Avenue, this Sunday.`
    );
    Spacer();
  };

  guests.forEach((guest) => invitationMsg(guest));
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise14();

export default Exercise14;
