export class Month {
  monthStart: Date;
  monthEnd: Date;

  constructor(dateWithinMonth: Date) {
    this.monthStart = new Date(
      Date.UTC(
        dateWithinMonth.getUTCFullYear(),
        dateWithinMonth.getUTCMonth(),
        1
      )
    );
    this.monthEnd = new Date(
      Date.UTC(
        dateWithinMonth.getUTCFullYear(),
        dateWithinMonth.getUTCMonth() + 1,
        1
      )
    );
  }
}
