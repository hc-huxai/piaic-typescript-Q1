let guests: string[] = ["Osman", "Ali", "Abdullah"];
let months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let minTimeout: number = 0;

console.log();
console.log("Sending Invitations to Guests...");

const newInvitation = (guest: string) => {
  console.log(`Hey ${guest}, you are invited to DINNER PARTY.`);
  console.log(
    "Come and eat with us, as we celebrate the company success throughout the year."
  );
  console.log(
    `See you there! ${
      new Date().getDate() > 15
        ? months[new Date().getMonth() + 1]
        : months[new Date().getMonth()]
    } 15, 10:00 PM at Tri Corp Building.\n\n`
  );
};

// To old guests
const oldInvitation = (guest: string) => {
  console.log(`Hey ${guest}, you are invited to DINNER PARTY.`);
  console.log(
    "Come and eat with us, as we celebrate the company success throughout the year."
  );
  console.log(
    `See you there! ${
      new Date().getDate() > 15
        ? months[new Date().getMonth() + 1]
        : months[new Date().getMonth()]
    } 15, 10:00 PM at Tri Corp Building.\n\n`
  );
  console.log();

  console.log(`We found a bigger table. So we are re-sending the invitations.`);
};

for (let i = 0; i < guests.length; i++) {
  newInvitation(guests[i]);
}

let guestCantCome: string = guests[Math.floor(Math.random() * guests.length)];

setTimeout(() => {
  console.log(`Wait`);

  console.log(`Looks like ${guestCantCome} can't come.`);
  console.log();

  console.log(`So we are inviting Ibrahim in place of ${guestCantCome}.`);
  console.log();
  console.log();

  guests[guests.indexOf(guestCantCome)] = "Ibrahim";

  minTimeout += 500;
}, minTimeout + 500);

setTimeout(() => {
  console.log(`Re-sending Invitations...`);
  minTimeout += 1000;
  for (let i = 0; i < guests.length; i++) {
    setTimeout(() => {
      newInvitation(guests[i]);
    }, minTimeout + 800);
  }
  minTimeout += 800;
}, minTimeout + 800);

let newGuests: string[] = ["Abdul Rahman", "Ehtisham", "Saad"];

setTimeout(() => {
  console.log();
  minTimeout += 600;
}, minTimeout + 600);

guests.unshift(newGuests[0]);
guests.push(newGuests[1]);
guests.splice(2, 0, newGuests[2]);

for (let i = 0; i < guests.length; i++) {
  setTimeout(() => {
    newGuests.indexOf(guests[i]) !== -1
      ? oldInvitation(guests[i])
      : newInvitation(guests[i]);
    minTimeout += 1000;
  }, minTimeout + 1000);
}
