const vehicle: {
  type: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  carStart: () => void;
  carStop: () => void;
} = {
  type: "Car",
  brand: "Toyota",
  model: "Cross",
  year: 2020,
  mileage: 24000,
  carStart: () => console.log("Car started"),
  carStop: () => console.log("Car Stopped"),
};

console.log(vehicle);
