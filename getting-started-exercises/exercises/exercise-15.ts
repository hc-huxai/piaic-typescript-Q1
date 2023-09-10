/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise15 = () => {
  let guests: string[] = ["Abu Hurairah", "Hamza", "Osman"];

  let guestCantCome: string = guests[Math.floor(Math.random() * guests.length)];
  let toInvite: string = "Ibrahim";

  Spacer();

  console.log(`In Exercise 14, we invited ${guests.length} guests to dinner.`);
  console.log(
    `Unfortunately, for some reason, ${guestCantCome} can't make to dinner.`
  );

  guests.splice(guests.indexOf(guestCantCome), 1, toInvite);

  console.log(`So we are inviting ${toInvite}..`);

  Spacer();

  console.log("Resending Invitations...");

  Spacer();

  const invitationMsg = (guestName: string) => {
    console.log(
      `Hi ${guestName}, You are invited to Dinner at Hotel Avenue, this Sunday.`
    );
    Spacer();
  };

  guests.forEach((guest) => invitationMsg(guest));

  console.log("Invitations Sent.");
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise15();

export default Exercise15;
