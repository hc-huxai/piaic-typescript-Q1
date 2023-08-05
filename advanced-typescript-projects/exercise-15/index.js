"use strict";
let guests = ["Osman", "Ali", "Abdullah"];
let months = [
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
let minTimeout = 0;
// guests.forEach((guest) => {
//   console.log(`Hey ${guest}, you are invited to DINNER PARTY`);
//   console.log(
//     "Come and eat with us, as we celebrate the company success throughout the year."
//   );
//   console.log(
//     `See you there! ${
//       new Date().getDate() > 15
//         ? months[new Date().getMonth() + 1]
//         : months[new Date().getMonth()]
//     } 15, 10:00 PM at Tri Corp Building.\n\n`
//   );
// });
console.log();
console.log("Sending Invitations to Guests...");
const invitation = (guest) => {
    console.log(`Hey ${guest}, you are invited to DINNER PARTY.`);
    console.log("Come and eat with us, as we celebrate the company success throughout the year.");
    console.log(`See you there! ${new Date().getDate() > 15
        ? months[new Date().getMonth() + 1]
        : months[new Date().getMonth()]} 15, 10:00 PM at Tri Corp Building.\n\n`);
};
for (let i = 0; i < guests.length; i++) {
    invitation(guests[i]);
}
let guestCantCome = guests[Math.floor(Math.random() * guests.length)];
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
            invitation(guests[i]);
        }, minTimeout + 800);
    }
    minTimeout += 800;
}, minTimeout + 1000);
