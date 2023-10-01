const E01_Interface = () => {
  interface User {
    name: string;
    age: number;
    isStudent: false;
    interests: string[];
    address: UserAddress;
    grades: {
      math: UserSubjectMarks;
      science: UserSubjectMarks;
    };
    contact: UserContact;
    tuple: [number, string, boolean];
    fnExample: (x: number) => number;
  }

  interface UserContact {
    email: string;
    phone: string;
  }

  interface UserSubjectMarks {
    midterm: number;
    final: number;
  }

  interface UserAddress {
    street: string;
    city: string;
    postalCode: number;
  }

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
};

console.log(process.stdout.rows);
console.log(process.stdout.columns);

export default E01_Interface;
