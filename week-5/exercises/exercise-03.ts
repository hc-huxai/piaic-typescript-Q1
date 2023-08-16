import { Spacer } from "../../EOA-Functions";

const Exercise03 = (array: any[], index: number, value: any) => {
  console.log(`Inserting value "${value}" at index ${index} of array =>`);
  console.log(array);

  array.splice(index, 0, value);

  Spacer();

  console.log(`Modified Array => `, array);
};

export default Exercise03;
