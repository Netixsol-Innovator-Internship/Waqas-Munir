// Objects ==> composed of properties, which are key/value pairs.
// Objects can be created using 3 methods

// 1. Object literals

const obj1 = {
  name: "Waqas",
  age: "22",
};

// 2. using constructor function of the class

// 3. using Object.create method

let Student = {
  name: "Lisa",
  age: 24,
  marks: 78.9,
  display() {
    console.log("Name:", this.name);
  },
};

let std = Object.create(Student);
std.name = "Me";
std.display();

// Arrays

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.push(12); // adding new element at the end of array
console.log(arr);
arr.pop(); // removing last element of the array
console.log(arr);
arr.shift(); // removes the first element of the array
console.log(arr);
arr.unshift(34); // add the new element in the start of array
console.log(arr);
const slicedArr = arr.slice(1, 4); //returns the new subset of the array b/w start and end elements ( start is inclusive but end element is exclusive ) , original array remains unchanged
console.log(arr);
console.log(slicedArr);
