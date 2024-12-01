import bcrypt from "bcryptjs";

export class Password {
  static create(password: string): Password {
    if (!password) {
      throw new Error("Invalid password");
    }
    return new Password(password);
  }

  constructor(public value: string) {
    const saltRounds = 10;
    this.value = bcrypt.hashSync(value.trim(), saltRounds);
  }

  verify(password: string): boolean {
    return bcrypt.compareSync(password, this.value);
  }
}
