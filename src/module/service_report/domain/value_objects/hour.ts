export class Hour {
  constructor(public value: number) {}

  static create(value?: number): Hour {
    if (!value) {
      return new Hour(0);
    }

    if (value < 0) {
      throw new Error("Hour cannot be negative");
    }

    return new Hour(value);
  }
}
