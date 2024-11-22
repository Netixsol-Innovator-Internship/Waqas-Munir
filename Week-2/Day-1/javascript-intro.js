let name = "Waqas";
console.log(name);

const ineterstRate = 0.4;
// ineterstRate = 1; it will give error because we can't reassign any value to any constant variable
console.log(ineterstRate);

// Primtivies Types ==> String, number, boolean, null, undefined
// Reference Types ==> Objects, Arrays, Functions

// Static  langauge ==> Type of variable is known at compile time
// Dynamic language ==> Type of variable is known at run time

// typeof keyword is used to check the type of variable

// Objects

let person = {
  name: "Waqas",
  age: 20,
};

// Dot Notation
console.log(person.name);

// Bracket Notation
console.log(person["age"]);

// Arrays
let selectedColors = ["red", "blue"];

// fun fact ==> typeof array is an object
console.log(typeof selectedColors);

// Functions
function greet(name, lastName) {
  console.log("Hello" + name + " " + lastName);
}

greet("Waqas", "Munir");
greet("Cody"); // passing only one argument will make the second parameter undefined as it is the default value of variables in javascript
