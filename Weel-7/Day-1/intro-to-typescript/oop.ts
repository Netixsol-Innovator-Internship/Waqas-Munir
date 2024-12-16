class User {
  constructor(private email: string, private name: string) {}

  get getEmail(): string {
    return this.email;
  }

  //   setter can't have any return type, otherwise it will throw an error
  set setEmail(email: string) {
    this.email = email;
  }
}

const me = new User("kuchbhi@gmail.com", "kuch bhi");

// Diff between Interfaces and Abstract classes
// both can be used as blueprints for classes but in abstract classes, we can also define methods and can use them by the objects of the class which is inheriting the abstract class
