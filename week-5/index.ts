let tasks: string[] = [
  "Learn Python",
  "Learn TypeScript",
  "Learn Flutter",
  "Learn ML",
];

tasks.forEach((task, index) => {
  console.log(`${index + 1}. ${task}`);
});

const evenToDo = (array: string[]) => {
  array.splice(array.length / 2 - 1, 2);
};

const oddToDo = (array: string[]) => {
  array.splice(Math.floor(array.length / 2), 1);
};

tasks.length % 2 == 0 ? evenToDo(tasks) : oddToDo(tasks);
console.log(tasks);
