export class Email {
  static create(email?: string): Email {
    if (!email) {
      throw new Error("Invalid email");
    }
    return new Email(email);
  }

  constructor(public value: string) {
    this.value = value.toLowerCase().trim();
  }
}
