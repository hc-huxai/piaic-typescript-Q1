// Exercise 01: Create a list of objects with car details & print company and year of each car.
// const Exercise01 = () => {
//   type CarType = { company: string; isUsed: boolean; year: number };

//   let cars: CarType[] = [
//     {
//       company: "Toyota",
//       isUsed: true,
//       year: 2012,
//     },
//     {
//       company: "Hyundai",
//       isUsed: false,
//       year: 2021,
//     },
//     {
//       company: "Morres Garage",
//       isUsed: false,
//       year: 2020,
//     },
//     {
//       company: "Rolls Royce",
//       isUsed: true,
//       year: 1998,
//     },
//     {
//       company: "KIA",
//       isUsed: false,
//       year: 2020,
//     },
//   ];

// cars.forEach((car) =>
//   console.log(`Company: ${car.company} | Year: ${car.year}`)
// );
// };

const Exercise01 = () => {
  type CarType = { company: string; isUsed: boolean; year: number };
  let companies = [
    "Toyota",
    "KIA",
    "MG",
    "Hyundai",
    "Ford",
    "Range Rover",
    "BMW",
  ];

  let cars: CarType[] = [];

  for (let i = 0; i < 20; i++) {
    cars.push({
      company: companies[Math.floor(Math.random() * companies.length)],
      isUsed: [true, false][Math.floor(Math.random() * 2)],
      year: Math.floor(Math.random() * (2023 - 1980)) + (2023 - 43),
    });
  }

  cars.forEach((car) =>
    console.log(`Company: ${car.company} | Year: ${car.year}`)
  );
};

// TODO: Uncomment this line to execute the code
Exercise01();

export default Exercise01;
