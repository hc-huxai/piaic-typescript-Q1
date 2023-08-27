// Exercise 01: Create a ToDo App and perform CRUD operations using map.

// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer, getInput } from "../../EOA-Functions/index";

const Exercise01 = () => {
  let todoTasks: Array<{ id: number; title: string; isComplete: boolean }> = [
    { id: 0, title: "Buy a new gaming laptop", isComplete: false },
    { id: 1, title: "Complete Assignment", isComplete: true },
    { id: 2, title: "Develop an app using Flutter", isComplete: false },
    { id: 3, title: "Learn React & Next with TypeScript", isComplete: false },
  ];

  const listTasks = (
    tasks: Array<{ id: number; title: string; isComplete: boolean }>
  ) => {
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}. ${task.title} | Status: ${
          task.isComplete ? "Completed" : "Pending"
        }`
      );
    });
  };

  Spacer(2);
  console.log(`Tasks =>`);
  listTasks(todoTasks);

  Spacer();

  let action: string = "";

  const getAction = () => {
    Spacer(2);
    console.log(`Actions:`);
    console.log(`l - List Tasks`);
    console.log(`a - Add New Task`);
    console.log(`r - Remove Task`);
    console.log(`u - Update Task Name/Status`);
    console.log(`c - Clear All Tasks from List`);
    console.log(`e - exit`);

    Spacer();

    action = getInput("Enter Action Shortcut => ");
  };
  getAction();

  // Actions' Function
  // Add
  const addTask = (
    array: Array<{ id: number; title: string; isComplete: boolean }>
  ) => {
    let title: string = getInput("Enter Task Title => ");

    let exit: string = "";

    if (title == "") {
      console.log(`Task Title not Found`);
      console.log(`Exiting function...`);
    } else {
      todoTasks.push({
        id: array[array.length - 1].id + 1,
        title: title,
        isComplete: false,
      });
      Spacer();
      console.log(`Item "${title}" with Status 'Pending' added to the List.`);
      Spacer();
    }
  };

  // Remove
  const removeTaskFromList = (
    array: Array<{ id: number; title: string; isComplete: boolean }>
  ) => {
    listTasks(array);
    Spacer();
    let taskID: number = getInput(
      `Which Item # Do You Want to Remove? (1-${array.length}) => `
    );

    console.log(taskID);

    if (isNaN(taskID)) {
      console.log(`No Item Selected for Removal,`);
      console.log(`Exiting function...`);
      return;
    }

    todoTasks = array.filter((task) => {
      if (task.id != taskID - 1) return task;
    });

    Spacer();
    console.log("Removed");
  };

  // Update
  const updateTask = (
    array: Array<{ id: number; title: string; isComplete: boolean }>
  ) => {
    listTasks(array);
    Spacer();
    let taskID = getInput(
      `Which Item # Do You Want to Update? (1-${array.length}) `
    );

    if (taskID == null) {
      console.log(`No Item Selected,`);
      console.log(`Exiting function...`);
      return;
    }

    taskID = Number(taskID);
    taskID--;

    console.log(`Leave empty if don't want to change.`);
    let updatedTaskTitle: string = getInput("Updated Task Title => ");
    Spacer();

    // It is declared with datatype 'any' to reuse it for boolean result
    let updatedStatus: any = getInput(
      "Updated Task Status\nc - Complete | p - Pending\n=> "
    );

    if (updatedStatus == "c") {
      updatedStatus == true;
    } else if (updatedStatus == "p") {
      updatedStatus = false;
    } else {
      console.log(`Invalid status shortcut given..`);
      console.log(`Status Value remained unchanged`);
      updatedStatus = todoTasks[taskID].isComplete;
    }

    todoTasks = todoTasks.map((task) => {
      if (task.id == taskID) {
        return {
          id: task.id,
          title: updatedTaskTitle == "" ? task.title : updatedTaskTitle,
          isComplete: updatedStatus,
        };
      } else {
        return task;
      }
    });

    Spacer();
    console.log("Updated");
  };

  // Clear
  const clearCart = () => {
    todoTasks = [];
    console.log(`All items are removed from cart.`);
  };

  let shouldExit = action == "e" ? false : true;

  while (shouldExit) {
    switch (action) {
      case "a": {
        // add new item
        addTask(todoTasks);
        Spacer();
        getAction();
        break;
      }
      case "l": {
        // List all Items in Cart
        listTasks(todoTasks);
        Spacer();
        getAction();
        break;
      }
      case "r": {
        // remove existing items from the cart
        removeTaskFromList(todoTasks);
        Spacer();
        getAction();
        break;
      }
      case "u": {
        // update quantities of an item already present on the cart
        updateTask(todoTasks);
        Spacer();
        getAction();
        break;
      }
      case "c": {
        // clear all items from the cart
        clearCart();
        Spacer();
        getAction();
        break;
      }
      default: {
        action = getInput("Invalid Shortcut, Please Try Again => ");
        break;
      }
    }
    shouldExit = action == "e" ? false : true;
  }
  console.log(`Exited`);
};

// TODO: Uncomment statement below to run function from this file
// Exercise01();

export default Exercise01;
