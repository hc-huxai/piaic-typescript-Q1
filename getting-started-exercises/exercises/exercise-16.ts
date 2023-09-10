/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise16 = () => {
  let guests: string[] = ["Abu Hurairah", "Hamza", "Osman"];

  // * From Exercise 15
  let guestCantCome: string = guests[Math.floor(Math.random() * guests.length)];
  let toInvite: string = "Ibrahim";

  guests.splice(guests.indexOf(guestCantCome), 1, toInvite);

  Spacer();

  console.log(
    `In Exercise 15, we received an apology message from ${guestCantCome} since he was unable to attend dinner, so we invited ${toInvite} instead.`
  );
  console.log(
    `Recently, the hotel called to let us know that they had discovered a larger table that could accommodate ${
      guests.length + 3
    } people.`
  );

  let newGuests: string[] = ["Yousuf", "Subhan", "Sameer"];

  console.log(`Inviting New Guests ${newGuests.join(", ")}`);

  guests.push(newGuests[0]);
  guests.splice(Math.floor(guests.length - 1 / 2), 0, newGuests[1]);
  guests.unshift(newGuests[2]);

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
// Exercise16();

export default Exercise16;
