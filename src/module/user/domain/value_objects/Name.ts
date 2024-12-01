export class Name {
  static create(firstName: string, lastName: string): Name {
    if (!firstName || !lastName) {
      throw new Error("Invalid name");
    }
    return new Name(firstName, lastName);
  }

  constructor(public firstName: string, public lastName: string) {
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  update(firstName: string, lastName: string): void {
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
  }
}
