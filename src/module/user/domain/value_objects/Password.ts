import bcrypt from "bcryptjs";

export class Password {
  static create(password?: string, hashed: boolean = false): Password {
    if (!password) {
      throw new Error("Invalid password");
    }
    return new Password(password, hashed);
  }

  static fromHash(hash: string): Password {
    return new Password(hash, true);
  }

  private constructor(public value: string, hashed: boolean = false) {
    if (!hashed) {
      const saltRounds = 10;
      this.value = bcrypt.hashSync(value.trim(), saltRounds);
      return;
    }
    this.value = value;
  }

  verify(password: string): boolean {
    return bcrypt.compareSync(password, this.value);
  }
}
