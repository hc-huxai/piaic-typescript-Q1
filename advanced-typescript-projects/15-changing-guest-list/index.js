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
for (let i = 0; i < guests.length; i++) {
    setTimeout(() => {
        console.log(`Hey ${guests[i]}, you are invited to DINNER PARTY.`);
        console.log("Come and eat with us, as we celebrate the company success throughout the year.");
        console.log(`See you there! ${new Date().getDate() > 15
            ? months[new Date().getMonth() + 1]
            : months[new Date().getMonth()]} 15, 10:00 PM at Tri Corp Building.\n\n`);
        minTimeout = 1000 * i;
    }, 1000 * i);
}
