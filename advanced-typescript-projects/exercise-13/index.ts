let fav_transportation: string[][] = [];
fav_transportation.push(["Harley Davidson", "Bike"]);
fav_transportation.push(["Audi E-Tron", "Car"]);

console.log(`Array:`);

console.log(fav_transportation);

console.log();

fav_transportation.forEach((transport) => {
  console.log(
    `I would like to own ${transport[0]} ${transport[1].toLowerCase()}`
  );
});
