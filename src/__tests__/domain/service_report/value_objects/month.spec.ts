import { describe, expect, it } from "vitest";

import { Month } from "@/modual/service_report/domain/value_objects/month";

describe("Month", () => {
  it("should create a month object with a range based on a date within the month", () => {
    const month = new Month(new Date("2024-01-15"));
    const monthStart = new Date("2024-01-01");
    const monthEnd = new Date("2024-01-31");

    expect(month.monthStart).toEqual(monthStart);
    expect(month.monthEnd).toEqual(monthEnd);
  });
});
