<link rel='stylesheet' href='../readme-style.css'>

# PIAIC Quarter 1: TypeScript

## Week 11 - Interfaces | Types | Generics

### Assignments:

1. Write datatype for this complex object using TS interface.

   ```ts
   const complexObject: User = {
     name: "John Doe",
     age: 30,
     isStudent: false,
     interests: ["programming", "music", "hiking"],
     address: {
       street: "123 Main St.",
       city: "Exampleville",
       postalCode: 12345,
     },
     grades: {
       math: {
         midterm: 85,
         final: 92,
       },
       science: {
         midterm: 78,
         final: 88,
       },
     },
     contact: {
       email: "john.doe@example.com",
       phone: "(650) 123-4567",
     },
     tuple: [1, "two", true],
     fnExample: function (x: number) {
       return x * 2;
     },
   };
   ```

2. Develop a TS Program that show the working of an ATM machine such
   - User should login by entering his/her unique account number and a secret PIN
   - User can check account balance
   - User can withdraw money
   - User can check his/her previous transaction in the current login
   - User should be asked at the end of each function that if he/she wants to end transaction or perform any other transaction, if the user chooses more transactions, he/she must be shown all options else quit the program.
