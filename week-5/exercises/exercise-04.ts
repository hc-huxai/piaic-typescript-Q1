const getInput = require("prompt-sync")({ sigint: true });
import { Spacer } from "../../EOA-Functions";

const Exercise04 = () => {
  let cartItems: Array<{ name: string; quantity: number }> = [
    { name: "blue shirts", quantity: 2 },
    { name: "black pants", quantity: 2 },
    { name: "blue trousers", quantity: 2 },
  ];

  const listCartItems = (cart: Array<{ name: string; quantity: number }>) => {
    cart.forEach((element, index) => {
      let tempArray = element.name.split(" ");
      let itemName: string = "";
      if (tempArray.length > 1) {
        tempArray.forEach((name) => {
          itemName +=
            name[0].toUpperCase() + name.substr(1).toLowerCase() + " ";
        });
      } else {
        itemName =
          element.name[0].toUpperCase() + element.name.substr(1).toLowerCase();
      }

      console.log(
        `${index + 1}. ${itemName.trim()} | Quantity: ${element.quantity}`
      );
    });
  };

  Spacer(2);
  console.log(`Cart =>`);
  listCartItems(cartItems);

  Spacer();

  let action: string = "";

  const getAction = () => {
    Spacer(2);
    console.log(`Actions:`);
    console.log(`l - List Items in Cart`);
    console.log(`a - Add Item to Cart`);
    console.log(`r - Remove Item From Cart`);
    console.log(`u - Update Name/Item in Cart`);
    console.log(`c - Clear All Items In Cart`);
    console.log(`e - exit`);

    Spacer();

    action = getInput("Enter Action Shortcut => ");
  };
  getAction();
  // Actions' Function
  // Add
  const addItem = (array: Array<{ name: string; quantity: number }>) => {
    let item: string = getInput("Enter Item Name => ");
    let itemQuantity: number = getInput("Enter Item Quantity => ");

    let exit: string = "";

    if (item == null && itemQuantity == null) {
      exit = getInput("Do you want to exit (Y/N)? ");
    }

    if (!itemQuantity) {
      console.log(
        `Item Quantity was not specified. So item is added with quantity '1'.`
      );
      itemQuantity = 1;
    }

    if (exit == "Y") {
    } else {
      array.push({ name: item, quantity: itemQuantity });
      Spacer();
      console.log(`Item "${item}" with quantity ${itemQuantity} added.`);
      Spacer();
    }
  };

  // Remove
  const removeItemFromCart = (
    array: Array<{ name: string; quantity: number }>
  ) => {
    listCartItems(array);
    Spacer();
    let itemToRemoveIndex = getInput(
      `Which Item # Do You Want to Remove? (1-${array.length}) `
    );
    array.splice(itemToRemoveIndex - 1, 1);
    Spacer();
    console.log("Removed");
  };

  // Update
  const updateCart = (array: Array<{ name: string; quantity: number }>) => {
    listCartItems(array);
    Spacer();
    let itemToUpdateIndex = getInput(
      `Which Item # Do You Want to Update? (1-${array.length}) `
    );
    console.log(`Leave empty if don't want to change.`);
    let updatedItemName = getInput("Updated Item Name => ");
    let updatedItemQuantity = parseInt(getInput("Updated Item Quantity => "));
    updatedItemQuantity = !updatedItemQuantity
      ? array[itemToUpdateIndex - 1].quantity
      : updatedItemQuantity;
    array.splice(itemToUpdateIndex - 1, 1, {
      name: updatedItemName,
      quantity: updatedItemQuantity,
    });
    Spacer();
    console.log("Updated");
  };

  // Clear
  const clearCart = () => {
    cartItems = [];
    console.log(`All items are removed from cart.`);
  };

  let shouldExit = action == "e" ? false : true;

  while (shouldExit) {
    switch (action) {
      case "a": {
        // add new item
        addItem(cartItems);
        Spacer();
        getAction();
        break;
      }
      case "l": {
        // List all Items in Cart
        listCartItems(cartItems);
        Spacer();
        getAction();
        break;
      }
      case "r": {
        // remove existing items from the cart
        removeItemFromCart(cartItems);
        Spacer();
        getAction();
        break;
      }
      case "u": {
        // update quantities of an item already present on the cart
        updateCart(cartItems);
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

export default Exercise04;
