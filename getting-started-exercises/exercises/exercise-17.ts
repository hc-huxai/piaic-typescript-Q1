/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise17 = () => {
  const invitationMsg = (guestName: string) => {
    console.log(
      `Hi ${guestName}, You are invited to Dinner at Hotel Avenue, this Sunday.`
    );
    Spacer();
  };

  const apologyMsg = (guestName: string) => {
    console.log(
      `Hi ${guestName}, Due to a lack of space, we had to cancel the invitation, and I apologize for any inconvenience this may cause you.`
    );
    Spacer();
  };

  let guests: string[] = ["Abu Hurairah", "Hamza", "Osman"];

  // * From Exercise 16
  let guestCantCome: string = guests[Math.floor(Math.random() * guests.length)];
  let toInvite: string = "Ibrahim";

  guests.splice(guests.indexOf(guestCantCome), 1, toInvite);

  Spacer();

  console.log(
    `In Exercise 15, the hotel called to let us know that they had discovered a larger table that could accommodate ${
      guests.length + 3
    } people.`
  );
  let newGuests: string[] = ["Yousuf", "Subhan", "Sameer"];

  // merging guests and newGuests
  guests.push(...newGuests);

  console.log(
    `The hotel called us again to inform us that due to a lack of room, we could only bring two guests.`
  );

  Spacer();

  console.log(
    `Taking guests off the list and sending them an apology message.`
  );

  let removedGuests: string[] = [];

  for (let i = 1; i <= 4; i++)
    removedGuests.push(
      guests.splice(Math.floor(Math.random() * guests.length), 1)[0]
    );

  Spacer();

  console.log(`Sending an Apology Message to ${removedGuests.join(", ")}`);

  Spacer();

  removedGuests.forEach((removed) => apologyMsg(removed));

  console.log("Resending Invitations to those, still invited...");

  Spacer();

  guests.forEach((guest) => invitationMsg(guest));

  console.log("Invitations Sent.");

  while (guests.length) guests.pop();

  console.log(`List of Guests => `, guests);
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise17();

export default Exercise17;
