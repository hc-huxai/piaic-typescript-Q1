/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround } from "../../EOA-Functions";

const Exercise18 = () => {
  let places: string[] = [
    "Singapore",
    "China",
    "Japan",
    "Turkey",
    "Vietnam",
    "MSG Sphere in Las Vegas",
  ];

  SpaceAround(() => console.log(`Initial Array => `, places));

  SpaceAround(() =>
    console.log(`Array in Alphabetical Order (Unmodified) => `, places.sort())
  );

  SpaceAround(() => console.log(`Array in Original Order => `, places));

  // Reversing Order of Array
  places = places.reverse();

  SpaceAround(() =>
    console.log(`Array in Reversed Order (Modified) => `, places)
  );

  // Re-Reversing Order to regain the Original Order
  places = places.reverse();

  SpaceAround(() =>
    console.log(`Array in Original Order (Modified) => `, places)
  );

  // Alphabetically Sorting an Array
  places = places.sort();

  SpaceAround(() =>
    console.log(`Array in Alphabetical Order (Modified) => `, places.sort())
  );

  // Reversing an Alphabetically Ordered Array
  places = places.sort();

  SpaceAround(() =>
    console.log(
      `Array in Reversed Alphabetical Order (Modified) => `,
      places.sort()
    )
  );
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise18();

export default Exercise18;
