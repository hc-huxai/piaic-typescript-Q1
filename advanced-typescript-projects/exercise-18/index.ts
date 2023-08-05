// Store the locations in a array. Make sure the array is not in alphabetical order.
let placesToVisit: string[] = [
  "Vietnam",
  "Turkiye",
  "China",
  "Japan",
  "Singapore",
];

console.log();

// Print your array in its original order.
console.log("Array: Original Order =>", placesToVisit);
console.log();

// Print your array in alphabetical order without modifying the actual list.
console.log("Array: Alphabetical Order (Unmodified) =>", placesToVisit.sort());
console.log();

// Show that your array is still in its original order by printing it.
console.log("Array: Original Order =>", placesToVisit);
console.log();

// Print your array in reverse alphabetical order without changing the order of the original list.
console.log(
  "Array: Alphabetical Order (Unmodified) =>",
  placesToVisit.sort().reverse()
);
console.log();

// Show that your array is still in its original order by printing it again.
console.log("Array: Original Order =>", placesToVisit);
console.log();

// Reverse the order of your list. Print the array to show that its order has changed.
placesToVisit = placesToVisit.reverse();
console.log("Array: Reversed Order =>", placesToVisit);
console.log();

// Reverse the order of your list again. Print the list to show it’s back to its original order.
placesToVisit = placesToVisit.reverse();
console.log("Array: Reversed Again to Gain Original Order =>", placesToVisit);
console.log();

// Sort your array so it’s stored in alphabetical order. Print the array to show that its order has been changed.
placesToVisit = placesToVisit.sort();
console.log("Array: Alphabetical Order (Modified) =>", placesToVisit);
console.log();

// Sort to change your array so it’s stored in reverse alphabetical order. Print the list to show that its order has changed.
placesToVisit = placesToVisit.reverse();
console.log("Array: Reversed Alphabetical Order (Modified) =>", placesToVisit);
console.log();
