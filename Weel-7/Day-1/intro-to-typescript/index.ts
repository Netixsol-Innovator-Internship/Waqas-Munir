type User = {
  readonly _id: string[]; // we can't reassign it, but can push and pop element from it
  name: string;
  isAuth: boolean;
};

const user: User = {
  _id: ["1", "2"],
  isAuth: false,
  name: "Waqas",
};

// Combining two types

type Email = {
  email: string;
};

type Name = {
  name: string;
};

type NewUser = Name &
  Email & {
    password: string;
  };

// Union Types

let arr: (number | string)[] = [1, 2, 3, "4"];

// Tuple

let rgb: [number, number, string] = [255, 122, "219"];

// Interface

interface myUser {
  email: string;
  password: string;
}

// reopening the interface
interface myUser {
  googleId?: string;
}

// Inheritance in interfaces
interface Admin extends myUser {
  role: "admin" | "ta" | "learner";
}
