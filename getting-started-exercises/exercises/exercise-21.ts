/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";

const Exercise21 = () => {
  let mountains: string[] = [
    "Mount Everest",
    "K-2",
    "Olympus Mons",
    "Kilimanjaro",
    "Mount Fuji",
  ];

  let rivers: string[] = [
    "River Nile",
    "River Mississippi",
    "River Indus",
    "River Euphrates",
    "The Amazon River",
  ];

  let countries: string[] = [
    "Pakistan",
    "Turkiye",
    "China",
    "Saudi Arabia",
    "Japan",
  ];

  let cities: string[] = [
    "Karachi",
    "Islamabad",
    "Las Vegas",
    "Istanbul",
    "Ankara",
  ];

  let languages: string[] = ["Urdu", "English", "Turkish", "Arabic", "Persian"];

  let lists: {} = {
    mountains: mountains,
    river: rivers,
    countries: countries,
    cities: cities,
    languages: languages,
  };

  // Printing Lists
  Object.entries(lists).forEach(([key, value]) => {
    SpaceAround(() => console.log(`${key}:`, value), 1, 0);
  });

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise21();

export default Exercise21;
