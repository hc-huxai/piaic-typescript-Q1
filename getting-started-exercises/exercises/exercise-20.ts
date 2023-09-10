/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

const Exercise20 = () => {
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

  let lists: string[][] = [mountains, rivers, countries, cities, languages];

  // Printing Lists
  lists.forEach((list) => console.log(list));
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise20();

export default Exercise20;
